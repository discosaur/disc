import { RestClient, SocketClient, MessageRes } from "../mod.ts";
import { green, yellow } from "../deps.ts";
import { TOKEN } from "../env.ts";

const rest = new RestClient(TOKEN);

const ws = new SocketClient(rest);

ws.on("DEBUG", ({ message }) => console.log(green("[DEBUG] [WS] ") + yellow(message)));

ws.on("MESSAGE_CREATE", async (message: MessageRes) =>
{
	if (message.content == "ping")
	{
		const msg = await rest.post<MessageRes>(`channels/${message.channel_id}/messages`, { content: "pong" });
		console.log(msg);
		console.log(message);
	}
	else if (message.content == "y")
		rest.put(`channels/${message.channel_id}/messages/${message.id}/reactions/😳/@me`);
});

@ws.on("MESSAGE_CREATE")
class test
{
	works(message: MessageRes)
	{
		console.log(message.author.username);
	}
}