import { TypedEmitter, RestClient, SocketClient, RestGuilds, GenericFunction, WrappedFunction, SocketEvent } from "../../mod.ts";
import { RestGuild, RestUser, RestMeUser, RestChannel } from "../rest/mod.ts";
import { UserManager } from "./UserManager.ts";


class BaseClient
{
	public rest: RestClient;
	public ws?: SocketClient;
	private token: string;

	public constructor(token: string)
	{
		this.token = token;
		this.rest = new RestClient(token);
	}

	public async login()
	{
		const gateway = await this.rest.get("gateway/bot");
		this.ws = new SocketClient(this.token, gateway.url + "?v=6&encoding=json");
	}
}

export class Client extends BaseClient
{
	public constructor(token: string)
	{
		super(token);
		
		this.ws?.on("")
	}

	public guilds = new RestGuilds(this.rest);

	public me = new RestMeUser(this.rest);

	public getGuildById = (id: string) =>
		new RestGuild(this.rest, id);

	public getUserById = (id: string) =>
		new UserManager(this.rest, id);

	public getChannelById = (id: string) =>
		new RestChannel(this.rest, id);
}
