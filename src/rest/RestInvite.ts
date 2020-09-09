import { GuildRes, PatchClientUserReq, ConnectionRes, ClientUserRes, SomeObject } from "../typings/mod.ts";
import { RestClient } from "./RestClient.ts";

export class RestInvite
{
	private readonly _rest: RestClient;

	private readonly route: string;

	constructor(rClient: RestClient)
	{
		this._rest = rClient;
		this.route = "invites/";
	}

	// code is not a snowflake or id
	public get(code: string): Promise<unknown>
	{
		return this._rest.get<unknown>(this.route + code);
	}

	public delete(code: string): Promise<unknown>
	{
		return this._rest.delete<unknown>(this.route + code);
	}
}
