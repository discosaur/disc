import { Snowflake } from "./Misc.ts";

export interface IGuildMember
{
	user: {
		id: Snowflake,
		username: string,
		avatar: string,
		discriminator: string
		public_flags: number
	},
	roles: Snowflake[],
	nick: string | null,
	premium_since?: string,
	joined_at: string,
	mute: boolean,
	deaf: boolean
}

