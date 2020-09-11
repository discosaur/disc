import { RestClient, SocketClient, MessageRes, ReadyRes } from "../mod.ts";
import { green, yellow, red } from "../deps.ts";
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

ws.on("READY", (data: ReadyRes) =>
{
	console.log([
		red("=".repeat(50)),
		yellow(`Connected to websocket as ${green(data.user.username)}#${green(data.user.discriminator)}`),
		yellow(`Gateway version: ${green(String(data.v))}`),
		yellow(`Guild count: ${green(String(data.guilds.length))}`),
		red("=".repeat(50)),
	].join("\n"));
});