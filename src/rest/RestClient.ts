import { AGENT } from "../../deps.ts";
import { SomeObject } from "../typings/mod.ts";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RestError
{
	error: {
		message: string
		code: number
	} | undefined
}

// the only headers required to manage ratelimits
interface RateLimitHeaders
{
	"x-ratelimit-remaining": string | null
	"x-ratelimit-reset-after": string | null
}

interface ParsedHeaders
{
	remaining: number
	reset_after: number
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

class Counter
{
	constructor(private _value = 0) { }
	public get value()
	{
		return this._value;
	}
	public increment(val = 1): number
	{
		return this.change(val);
	}
	public decrement(val = 1): number
	{
		return this.change(-val);
	}
	private onTimer = false;
	public incrementTimed(timeout: number, val = 1)
	{
		if (this.onTimer)
			return;
		this.onTimer = true;
		setTimeout(() =>
		{
			this.increment(val);
			this.onTimer = false;
		}, timeout);
	}
	private change(val: number): number
	{
		this._value += val;
		return this._value;
	}
}

interface Queue
{
	reset_after: number
	remaining_constant: number
	remaining: Counter
}

class RateLimitManager
{
	public queues = new Map<string, Queue>()

	public has(route: string)
	{
		return this.queues.has(route);
	}

	public set(route: string, info: ParsedHeaders)
	{
		this.queues.set(
			route,
			{
				reset_after: info.reset_after * 1000,
				remaining_constant: info.remaining,
				remaining: new Counter(info.remaining)
			}
		);
	}

	public async okay(route: string)
	{
		const queue = this.queues.get(route);

		if (!queue)
			return;

		async function attempt(manager: RateLimitManager, remaining: Counter)
		{
			if (remaining.value == 0)
			{
				const timeout = manager.queues.get(route)!.reset_after;
				remaining.incrementTimed(timeout, manager.queues.get(route)!.remaining_constant);
				await sleep(timeout);
				await attempt(manager, remaining);
			}
			else
			{
				remaining.decrement();
				return;
			}
		}
		await attempt(this, queue!.remaining);
	}
}

export class RestClient
{
	private readonly _endpoint: string = "https://discord.com/api/v6/";
	private headers: Record<string, string>;
	private manager = new RateLimitManager()

	public readonly token: string;

	constructor(token: string)
	{
		this.headers = {
			"Authorization": "Bot " + token,
			"Content-Type": "application/json",
			"User-Agent": AGENT,
			"X-RateLimit-Precision": "millisecond"
		}

		this.token = token;
	}
	
	public get<T extends unknown>(path: string): Promise<T & RestError>
	{
		return this.do("GET", path);
	}
	
	public post<T extends unknown>(path: string, body?: SomeObject): Promise<T & RestError>
	{
		return this.do("POST", path, body);
	}

	public patch<T extends unknown>(path: string, body: SomeObject): Promise<T & RestError>
	{
		return this.do("PATCH", path, body);
	}

	public put<T extends unknown>(path: string, body?: SomeObject): Promise<T & RestError>
	{
		return this.do("PUT", path, body);
	}

	public delete<T extends unknown>(path: string): Promise<T & RestError>
	{
		return this.do("DELETE", path);
	}

	protected async do<T extends unknown>(method: Method, path: string, body?: SomeObject): Promise<T & RestError>
	{

		const baseRoute = path.split("/").slice(0, 2).join("/");
	
		await this.manager.okay(baseRoute);

		const res = await fetch(this._endpoint + path, {
			headers: this.headers,
			method: method,
			body: JSON.stringify(body)
		});

		if (!this.manager.has(baseRoute))
		{
			const limits: RateLimitHeaders = {
				"x-ratelimit-remaining": 	res.headers.get("x-ratelimit-remaining"),
				"x-ratelimit-reset-after": 	res.headers.get("x-ratelimit-reset-after")
			}
			
			// check if headers were actually present
			if (limits["x-ratelimit-reset-after"] != null)
				this.manager.set(
					baseRoute,
					{
						remaining: 		Number(limits["x-ratelimit-remaining"]),
						reset_after: 	Number(limits["x-ratelimit-reset-after"])
					}
				);
		}

		if (res.status == 429)
			console.log("Got ratelimited for some reason :(");

		// http code >= 400
		if (res.status >= 400)
			return {
				error: {
					code: res.status,
					message: res.statusText
				}
			} as T & RestError;

		// http code < 400
		else
		{
			// no body, would crash deno if tried to parse
			if (res.body == null)
				return {
					error: undefined
				} as T & RestError;

			else
				return {
					...(await res.json()),
					error: undefined
				};
		}
	}
}