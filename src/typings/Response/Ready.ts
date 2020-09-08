import { Snowflake } from "../mod.ts";
import { ClientUserRes } from "./mod.ts";

export interface ReadyRes
{
	v: number
	user_settings: {}
	user: ClientUserRes
	session_id: string
	relationships: unknown[]
	private_channels: unknown[]
	presences: unknown[]
	guilds: {
		unavailable: boolean
		id: Snowflake
	}[]
	application: {
		id: Snowflake
		flags: number
	}
	_trace: string[]
}