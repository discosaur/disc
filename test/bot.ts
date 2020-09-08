import { RestClient, SocketClient, RawMessage, RawReadyData } from "../mod.ts";
import { green, yellow, red } from "../deps.ts";
import { TOKEN } from "../env.ts";
import { RestChannel } from "../src/rest/mod.ts";

const rest = new RestClient(TOKEN);
const restChannel = new RestChannel(rest, "714930431065325612");

const { url } = await rest.get("gateway/bot");

const ws = new SocketClient(TOKEN, url);

ws.on("MESSAGE_CREATE", (message: RawMessage) =>
{
	if (message.content == "ping")
		rest.post(`channels/${message.channel_id}/messages`, { content: "pong" });
});

ws.on("READY", async (data: RawReadyData) =>
{
	console.log([
		red("=".repeat(50)),
		yellow(`Connected to websocket as ${green(data.user.username)}#${green(data.user.discriminator)}`),
		yellow(`Gateway version: ${green(String(data.v))}`),
		yellow(`Guild count: ${green(String(data.guilds.length))}`),
		red("=".repeat(50)),
	].join("\n"));

	console.log(await restChannel.GetMessages())
});
