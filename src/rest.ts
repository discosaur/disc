import { AGENT, REST_URL } from "./constants.ts";
import { ParsedHeaders, RateLimitHeaders, RestError, RestMethod } from "./types.ts";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

class LimitCounter
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

	public incrementBlocking(timeout: number, val = 1)
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

class RateLimitBank
{
	public queues = new Map<string, {
		reset_after: number
		remaining_constant: number
		remaining: LimitCounter
	}>()

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
				remaining: new LimitCounter(info.remaining)
			}
		);
	}

	public async okay(route: string)
	{
		const queue = this.queues.get(route);

		if (!queue)
			return;

		async function attempt(bank: RateLimitBank, remaining: LimitCounter)
		{
			if (remaining.value == 0)
			{
				const timeout = bank.queues.get(route)!.reset_after;
				remaining.incrementBlocking(timeout, bank.queues.get(route)!.remaining_constant);
				await sleep(timeout);
				await attempt(bank, remaining);
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

export default class Rest
{
	private headers: Record<string, string>;
	private manager = new RateLimitBank()

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

	public post<T extends unknown>(path: string, body?: {}): Promise<T & RestError>
	{
		return this.do("POST", path, body);
	}

	public patch<T extends unknown>(path: string, body: {}): Promise<T & RestError>
	{
		return this.do("PATCH", path, body);
	}

	public put<T extends unknown>(path: string, body?: {}): Promise<T & RestError>
	{
		return this.do("PUT", path, body);
	}

	public delete<T extends unknown>(path: string): Promise<T & RestError>
	{
		return this.do("DELETE", path);
	}

	protected async do<T extends unknown>(method: RestMethod, path: string, body?: {}): Promise<T & RestError>
	{

		const baseRoute = path.split("/").slice(0, 2).join("/");

		await this.manager.okay(baseRoute);

		const res = await fetch(REST_URL + path, {
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

		// ratelimited, push back into queue
		if (res.status == 429)
			return this.do(method, path, body);

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
				return {} as T & RestError;

			else
				return (await res.json());
		}
	}
}