import { TOKEN } from "../config.ts";
import Rest from "../src/rest.ts";
import type { RestError } from "../src/types.ts";

const client = new Rest(TOKEN);
let res: { url: string } & RestError;

Deno.test("Fetching endpoint results in Ok response", async () =>
{
	res = await client.get<{ url: string }>("gateway/bot");
	if (res.error)
		throw new Error();
});

Deno.test("Gateway endpoint returns expected data", () =>
{
	if (!res.url.startsWith("wss://"))
		throw new Error();
})