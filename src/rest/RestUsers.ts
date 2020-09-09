import { RestClient } from "./RestClient.ts";
import { GuildRes, PatchClientUserReq, ConnectionRes, ClientUserRes, SomeObject } from "../typings/mod.ts";

export class RestUser
{
	private readonly _rest: RestClient;

	public readonly id: string;
	private readonly route: string;

	constructor(rClient: RestClient, id: string)
	{
		this._rest = rClient;
		this.id = id;
		this.route = "users/" + this.id;
	}

	public get(): Promise<unknown>
	{
		return this._rest.get(this.route);
	}
}

export class RestMeUser
{
	private readonly _rest: RestClient;

	private readonly route: string = "users/@me";

	constructor(rClient: RestClient)
	{
		this._rest = rClient;
	}

	//#region General
	public get(): Promise<ClientUserRes>
	{
		return this._rest.get<ClientUserRes>(this.route);
	}

	// TODO This has may have params
	public modify(opts: PatchClientUserReq): Promise<ClientUserRes>
	{
		return this._rest.patch<ClientUserRes>(this.route, opts);
	}
	//#endregion
	
	//#region Guilds
	// TODO This has may have params
	public getGuilds(): Promise<GuildRes>
	{
		return this._rest.get<GuildRes>(this.route + "/guilds");
	}
	
	public leaveGuild(id: string): Promise<void>
	{
		return this._rest.delete<void>(`${this.route}/guilds/${id}`);
	}
	//#endregion

	//#region DMs
	/**
	 * No longer supported for bots, will return empty array
	 * [Discord Docs](https://discord.com/developers/docs/resources/user#get-user-dms)
	 */
	public getDmChannels(): Promise<unknown[]>
	{
		return this._rest.get<unknown[]>(this.route + "/channels");
	}

	public createDm(opts: string): Promise<unknown>
	{
		return this._rest.post<unknown>(this.route + "/channels", { recipient_id: opts });
	}

	public createGroupDm(opts: SomeObject): Promise<unknown>
	{
		return this._rest.post<unknown>(this.route + "/channels", opts);
	}
	//#endregion

	//#region Misc
	public getUserConnections(): Promise<ConnectionRes[]>
	{
		return this._rest.get<ConnectionRes[]>(this.route + "/connections");
	}
	//#endregion
}
