import { Guilds, MeUser, Guild, User } from "./deps.ts";
import { RestChannel } from "../src/rest/mod.ts";
import { SocketClient } from "../src/ws/mod.ts";
import { RestClient } from "../src/rest/mod.ts";
import { SomeObject, TypedEmitter } from "../src/typings/mod.ts";

type ClientEvent = "ready";

class BaseClient extends TypedEmitter<ClientEvent, SomeObject>
{
	public rest: RestClient;
	public ws?: SocketClient;
	private token: string;

	constructor(token: string)
	{
		super();
		this.token = token;
		this.rest = new RestClient(token);
	}

	public async login()
	{
		const { url } = await this.rest.get("gateway/bot");
		this.ws = new SocketClient(this.token, url);
		this.ws.on("READY", () => this.emit("ready"));
	}
}

class Client extends BaseClient
{	
	constructor(token: string)
	{
		super(token);
	}

	public guilds = new Guilds(this.rest);

	public me = new MeUser(this.rest);

	public getGuildById(id: string)
	{
		return new Guild(this.rest, id);
	}

	public getUserById(id: string)
	{
		return new User(this.rest, id);
	}

	public getChannelById(id: string)
	{
		return new RestChannel(this.rest, id);
	}
}

export { Client };
