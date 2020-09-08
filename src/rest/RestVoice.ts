import { RestClient } from "./RestClient.ts";
import { IBaseGuildMe, IPatchUserMe, IConnection, IGetUserMe, SomeObject } from "../typings/mod.ts";

export class RestVoice
{
	private readonly _rest: RestClient;

	private readonly route: string = "voice";

	constructor(rClient: RestClient)
	{
		this._rest = rClient;
		this.route = "voice";
	}

	public GetRegions(): Promise<unknown[]>
	{
		return this._rest.get(this.route + "/regions");
	}
}
