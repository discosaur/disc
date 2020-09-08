import { Snowflake } from "../mod.ts";

export interface CreateEmojiReq
{
	name: string,
	image: unknown,
	roles: Snowflake[]
}

export interface ModifyEmojiReq
{
	name: string,
	roles: Snowflake[]
}