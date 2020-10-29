import { Gateway } from "../src/gateway.ts";
import { INTENTS, TOKEN, PRESENCE } from "../config.ts";
import { DispatchedEvent, GatewayEmit, ReadyData } from "../src/types.ts";

const client = new Gateway(TOKEN, INTENTS, PRESENCE);

let data: GatewayEmit<ReadyData>;

client.on(DispatchedEvent.Ready, (received: GatewayEmit<ReadyData>) =>
{
	data = received;
	client.close();
});

const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
await sleep(5);

Deno.test("Received Ready Event after 5 seconds", () =>
{
	if (!data)
		throw new Error();
});