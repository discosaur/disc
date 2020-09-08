import { Snowflake } from "../mod.ts";

export interface MemberRes
{
	roles: Snowflake[]
	premium_since: null | string
	nick: null | string
	mute: boolean
	joined_at: string
	hoisted_role: Snowflake
	deaf: boolean
}