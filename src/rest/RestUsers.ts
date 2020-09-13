import { RestClient } from "./RestClient.ts";
import {
	APIGuild,
	RestPatchAPICurrentUserJSONBody,
	RestPatchAPICurrentUserResult,
	SomeObject,
	APIConnection,
	APIUser
} from "../typings/mod.ts";

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

export class RestClientUser
{
	private readonly _rest: RestClient;

	private readonly route: string = "users/@me";

	constructor(rClient: RestClient)
	{
		this._rest = rClient;
	}

	//#region General
	public get()
	{
		return this._rest.get<APIUser>(this.route);
	}

	// TODO This has may have params
	public modify(opts: RestPatchAPICurrentUserJSONBody)
	{
		return this._rest.patch<RestPatchAPICurrentUserResult>(this.route, opts);
	}
	//#endregion
	
	//#region Guilds
	// TODO This has may have params
	public getGuilds()
	{
		return this._rest.get<APIGuild>(this.route + "/guilds");
	}
	
	public leaveGuild(id: string)
	{
		return this._rest.delete<void>(`${this.route}/guilds/${id}`);
	}
	//#endregion

	//#region DMs
	/**
	 * No longer supported for bots, will return empty array
	 * [Discord Docs](https://discord.com/developers/docs/resources/user#get-user-dms)
	 */
	public getDmChannels()
	{
		return this._rest.get<unknown[]>(this.route + "/channels");
	}

	public createDm(opts: string)
	{
		return this._rest.post<unknown>(this.route + "/channels", { recipient_id: opts });
	}

	public createGroupDm(opts: SomeObject)
	{
		return this._rest.post<unknown>(this.route + "/channels", opts);
	}
	//#endregion

	//#region Misc
	public getUserConnections()
	{
		return this._rest.get<APIConnection[]>(this.route + "/connections");
	}
	//#endregion
}
