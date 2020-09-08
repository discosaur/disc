import { RestClient, SocketClient, MessageRes, ReadyRes } from "../mod.ts";
import { green, yellow, red, AGENT } from "../deps.ts";
import { TOKEN } from "../env.ts";
import { RestChannel } from "../src/rest/mod.ts";

const rest = new RestClient(TOKEN);

const { url } = await rest.get("gateway/bot");

const ws = new SocketClient(TOKEN, url);

ws.on("MESSAGE_CREATE", (message: MessageRes) =>
{
	if (message.content == "ping")
		rest.post(`channels/${message.channel_id}/messages`, { content: "pong" });
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