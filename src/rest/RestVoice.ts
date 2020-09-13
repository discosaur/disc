import { RestClient } from "./RestClient.ts";

export class RestVoice
{
	private readonly _rest: RestClient;

	private readonly route: string = "voice";

	constructor(rClient: RestClient)
	{
		this._rest = rClient;
		this.route = "voice";
	}

	public getRegions(): Promise<unknown[]>
	{
		return this._rest.get<unknown[]>(this.route + "/regions");
	}
}
