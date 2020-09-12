import { AGENT, red } from "../../deps.ts";
import { SomeObject } from "../typings/mod.ts";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RateLimitHeaders
{
	"x-ratelimit-remaining": number
	"x-ratelimit-reset": number
	"x-ratelimit-reset-after": number
	"x-ratelimit-bucket": string
	"x-ratelimit-global"?: number
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

class RateLimitManager
{
	public reset_after = new Map<string, number>()
	public remaining_constant = new Map<string, number>()
	public remaining = new Map<string, Counter>()

	public set(info: RateLimitHeaders, route: string)
	{
		if (!this.remaining.has(route))
		{
			this.remaining.set(route, new Counter(info["x-ratelimit-remaining"]));
			this.remaining_constant.set(route, info["x-ratelimit-remaining"]);
			this.reset_after.set(route, info["x-ratelimit-reset-after"] * 1000);
		}
	}

	public async okay(route: string)
	{
		const remaining = this.remaining.get(route);

		if (remaining == undefined)
			return;

		async function tryToRun(manager: RateLimitManager, remaining: Counter)
		{
			if (remaining.value == 0)
			{
				const timeout = manager.reset_after.get(route)!;
				remaining.incrementTimed(timeout, manager.remaining_constant.get(route));
				await sleep(timeout);
				await tryToRun(manager, remaining);
			}
			else
			{
				remaining.decrement();
				return;
			}
		}
		await tryToRun(this, remaining);
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
	
	public get<T extends unknown>(path: string): Promise<T>
	{
		return this.do("GET", path);
	}
	
	public post<T extends unknown>(path: string, body?: SomeObject): Promise<T>
	{
		return this.do("POST", path, body);
	}

	public patch<T extends unknown>(path: string, body: SomeObject): Promise<T>
	{
		return this.do("PATCH", path, body);
	}

	public put<T extends unknown>(path: string, body?: SomeObject): Promise<T>
	{
		return this.do("PUT", path, body);
	}

	public delete<T extends unknown>(path: string): Promise<T>
	{
		return this.do("DELETE", path);
	}

	protected async do<T extends unknown>(method: Method, path: string, body?: SomeObject): Promise<T>
	{

		const baseRoute = path.split("/").slice(0, 2).join("/");
	
		await this.manager.okay(baseRoute);

		const res = await fetch(this._endpoint + path, {
			headers: this.headers,
			method: method,
			body: JSON.stringify(body)
		});

		const rateLimitInfo: RateLimitHeaders = {
			"x-ratelimit-remaining": 	Number(res.headers.get("x-ratelimit-remaining")),
			"x-ratelimit-reset": 		Number(res.headers.get("x-ratelimit-reset")),
			"x-ratelimit-reset-after": 	Number(res.headers.get("x-ratelimit-reset-after")),
			"x-ratelimit-bucket": 		res.headers.get("x-ratelimit-bucket") as string,
			"x-ratelimit-global": 		res.headers.get("x-ratelimit-global")
				? Number(res.headers.get("x-ratelimit-global"))
				: undefined
		}
		
		if (rateLimitInfo["x-ratelimit-reset-after"])
			this.manager.set(rateLimitInfo, baseRoute);

		if (res.status == 429)
			console.log(red("oopsie! ratelimits :( WIP"));
		if (res.status >= 400)
			throw new Error(res.statusText);

		else if (res.body != null)
			return res.json();
		else
			return {} as T;
	}
}