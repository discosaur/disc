import { RestClient } from "./RestClient.ts";
import { IBaseGuildMe, IPatchUserMe, IConnection, IGetUserMe, SomeObject } from "../typings/mod.ts";

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
	public Get(code: string): Promise<unknown>
	{
		return this._rest.get(this.route + code);
	}

	public Delete(code: string): Promise<unknown>
	{
		return this._rest.delete(this.route + code);
	}
}
