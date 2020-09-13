import type { APISocketBotInfo, APISocketInfo } from "../mod.ts";

/**
 * https://discord.com/developers/docs/topics/gateway#get-gateway
 */
export type RESTGetAPISocketResult = APISocketInfo;

/**
 * https://discord.com/developers/docs/topics/gateway#get-gateway-bot
 */
export type RESTGetAPISocketBotResult = APISocketBotInfo;
