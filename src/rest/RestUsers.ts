import { RestClient } from "./RestClient.ts";
import { IBaseGuildMe, IPatchUserMe, IConnection, IGetUserMe, SomeObject } from "../typings/mod.ts";

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

	public Get(): Promise<unknown>
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
	public Get(): Promise<IGetUserMe>
	{
		return this._rest.get(this.route);
	}

	// TODO This has may have params
	public Modify(opts: IPatchUserMe): Promise<IGetUserMe>
	{
		return this._rest.patch(this.route, opts);
	}
	//#endregion
	
	//#region Guilds
	// TODO This has may have params
	public GetGuilds(): Promise<IBaseGuildMe>
	{
		return this._rest.get(this.route + "/guilds");
	}
	
	public LeaveGuild(id: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/guilds/${id}`);
	}
	//#endregion

	//#region DMs
	/**
	 * No longer supported for bots, will return empty array
	 * [Discord Docs](https://discord.com/developers/docs/resources/user#get-user-dms)
	 */
	public GetDmChannels(): Promise<unknown[]>
	{
		return this._rest.get(this.route + "/channels");
	}

	public CreateDm(opts: string): Promise<unknown>
	{
		return this._rest.post(this.route + "/channels", { recipient_id: opts });
	}

	public CreateGroupDm(opts: SomeObject): Promise<unknown>
	{
		return this._rest.post(this.route + "/channels", opts);
	}
	//#endregion

	//#region Misc
	public GetUserConnections(): Promise<IConnection>
	{
		return this._rest.get(this.route + "/connections");
	}
	//#endregion
}
