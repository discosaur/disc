import { RestUser, Snowflake, GuildRes } from "../../mod.ts";
import {  } from "module";
import { IGuild } from "../typings/mod.ts";

export class GuildManager
{
	private rest: RestUser;
	private socket?: unknown;
	private cached: Record<Snowflake, Partial<RestUser>> = {};

	public constructor(r: RestUser, w?: unknown)
	{
		this.rest = r;
		this.socket = w;
	}

	public UpdateCacheItem(item: IGuild)
	{
		this.cached[item.id] = item;
	}

	
	public async get(id: Partial<Snowflake>): RestUser
	{
		let a = new Guild(id);
		return (await this.rest.get())
	}

	
	public set set(v: T)
	{
		this.rest = v;
	}
}

class Guild extends IGuild
{
	private item: Partial<GuildRes> = {};

	public constructor(id: string)
	{
		this.
	}
}
