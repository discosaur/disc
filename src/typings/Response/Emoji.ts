import { Snowflake } from "../mod.ts";

export interface EmojiRes
{
	id: Snowflake | null,
	name?: string,
	roles?: string[],
	user?: string,
	require_colons?: boolean,
	managed?: boolean,
	animated?: boolean,
	available: boolean
}
