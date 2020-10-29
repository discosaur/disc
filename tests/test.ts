import { INTENTS, PRESENCE, TOKEN } from "../config.ts";
import { Gateway } from "../mod.ts";
import Rest from "../src/rest.ts";
import { DispatchedEvent } from "../src/types.ts";

const gwClient = new Gateway(TOKEN, INTENTS, PRESENCE);
gwClient.on(DispatchedEvent.Ready, () => console.log("ready"));

const rClient = new Rest(TOKEN);
rClient.get("")
