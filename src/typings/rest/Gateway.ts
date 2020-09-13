import type { APISocketBotInfo, APISocketInfo } from "../mod.ts";

/**
 * https://discord.com/developers/docs/topics/gateway#get-gateway
 */
export type GetAPISocketResult = APISocketInfo;

/**
 * https://discord.com/developers/docs/topics/gateway#get-gateway-bot
 */
export type GetAPISocketBotResult = APISocketBotInfo;
