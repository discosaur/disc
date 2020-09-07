import { AGENT, red } from "../../deps.ts";
import { SomeObject } from "../typings/mod.ts";

class RateLimitManager
{
	public queues = new Map<string, Queue>()

	public set(ms: number, route: string)
	{
		this.queues.set(route, {
			okay: false,
			okayWhen: Date.now() + ms
		});
	}
	public async okay(route: string)
	{
		const queue = this.queues.get(route);

		if (!queue)
		{
			this.queues.set(route, { okay: true, okayWhen: Date.now() })
			return;
		}

		if (queue.okay)
			return;

		const timeout = queue.okayWhen - Date.now();

		if (timeout <= 0)
		{
			this.queues.set(route, { okay: true, okayWhen: Date.now() })
			return;
		}

		console.log(`Sleeping ${timeout}ms to prevent ratelimiting`);
		await sleep(timeout);
	}
}

export class RestClient
{
	private readonly _endpoint: string = "https://discord.com/api/v6/";
	private headers: Record<string, string>;
	private manager = new RateLimitManager()

	constructor(token: string)
	{
		this.headers = {
			"Authorization": "Bot " + token,
			"Content-Type": "application/json",
			"User-Agent": AGENT,
			"X-RateLimit-Precision": "millisecond"
		}
	}
	
	public get(path: string)
	{
		return this.do("GET", path);
	}
	
	public post(path: string, body?: SomeObject)
	{
		return this.do("POST", path, body);
	}

	public patch(path: string, body: SomeObject)
	{
		return this.do("PATCH", path, body);
	}

	public put(path: string, body?: SomeObject)
	{
		return this.do("PUT", path, body);
	}

	public delete(path: string)
	{
		return this.do("DELETE", path);
	}

	protected async do(method: Method, path: string, body?: SomeObject): Promise<any>
	{

		const baseRoute = path.split("/").slice(0, 2).join("/");
	
		await this.manager.okay(baseRoute);

		const res = await fetch(this._endpoint + path, {
			headers: this.headers,
			method: method,
			body: JSON.stringify(body)
		});

		const rateLimitInfo: RateLimitHeaders = {
			"x-ratelimit-remaining": Number(res.headers.get("x-ratelimit-remaining")),
			"x-ratelimit-reset": Number(res.headers.get("x-ratelimit-reset")),
			"x-ratelimit-reset-after": Number(res.headers.get("x-ratelimit-reset-after")),
			"x-ratelimit-bucket": res.headers.get("x-ratelimit-bucket") as string,
			"x-ratelimit-global": res.headers.get("x-ratelimit-global")
				? Number(res.headers.get("x-ratelimit-global"))
				: undefined
		}
		
		if (rateLimitInfo["x-ratelimit-remaining"] == 0)
			this.manager.set(rateLimitInfo["x-ratelimit-reset-after"] * 1000, baseRoute);

		if (res.status == 429)
			console.log(red("oopsie! ratelimits :( WIP"));

		if (res.status >= 400)
			return { error: res.statusText };

		return res.json();
	}
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface Queue
{
	okay: boolean
	okayWhen: number
}

interface RateLimitHeaders
{
	"x-ratelimit-remaining": number
	"x-ratelimit-reset": number
	"x-ratelimit-reset-after": number
	"x-ratelimit-bucket": string
	"x-ratelimit-global"?: number
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));