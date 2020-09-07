import { Guilds, MeUser, Guild, User } from "./deps.ts";
import { Channel } from "../rest/RestChannel.ts";
import { EventEmitter, DiscordWebSocket, Rest } from "./deps.ts";

class BaseClient extends EventEmitter
{
	public rest: Rest;
	public ws?: DiscordWebSocket;
	private token: string;

	constructor(token: string)
	{
		super();
		this.token = token;
		this.rest = new Rest(token);
	}

	public async login()
	{
		const gateway = await this.rest.get("gateway/bot");
		this.ws = new DiscordWebSocket(this.token, gateway.url + "?v=6&encoding=json");
		this.ws.on("ready", () => this.emit("ready"));
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
		return new Channel(this.rest, id);
	}
}

export { Client };
