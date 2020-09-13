import type { APISocketBotInfo, APISocketInfo } from "../mod.ts";

/**
 * https://discord.com/developers/docs/topics/gateway#get-gateway
 */
export type RestGetAPISocketResult = APISocketInfo;

/**
 * https://discord.com/developers/docs/topics/gateway#get-gateway-bot
 */
export type RestGetAPISocketBotResult = APISocketBotInfo;
