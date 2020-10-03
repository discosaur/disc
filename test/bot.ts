import { RestClient, SocketClient, APIMessage, SocketEvents } from "../mod.ts";
import { green, yellow } from "../deps.ts";
import { TOKEN } from "../env.ts";

const rest = new RestClient(TOKEN);

const socket = new SocketClient(rest);

socket.on(SocketEvents.Debug, ({ message }) => console.log(green("[DEBUG] [WS] ") + yellow(message)));

socket.on(SocketEvents.MessageCreate, async (message: APIMessage) =>
{
	if (message.content == "ping")
	{
		const msg = await rest.post<APIMessage>(`channels/${message.channel_id}/messages`, { content: "pong" });
		console.log(msg);
		console.log(message);
	}
	else if (message.content == "y")
		rest.put(`channels/${message.channel_id}/messages/${message.id}/reactions/😳/@me`);
});