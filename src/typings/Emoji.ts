import { Snowflake } from "./mod.ts";

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

export interface IEmoji
{
	id: Snowflake | null,
	name: string | null,
	roles?: Snowflake[],
	user?: Snowflake,
	require_colons?: boolean,
	managed?: boolean,
	animated?: boolean,
	available?: boolean
}