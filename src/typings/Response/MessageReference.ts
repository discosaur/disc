import { Snowflake } from "../mod.ts";

export interface MessageReferenceRes
{
	channel_id: Snowflake
	guild_id: Snowflake
	message_id: Snowflake
}