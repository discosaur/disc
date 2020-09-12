import { Snowflake } from "../Misc.ts";

export interface IGuildMemberModifyReq
{
	nick: string | null,
	roles: Snowflake[],
	mute: boolean,
	deaf: boolean,
	channel_id: Snowflake | null
}