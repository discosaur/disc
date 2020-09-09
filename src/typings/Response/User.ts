import { Snowflake } from "../mod.ts";

export interface UserRes
{
	id: Snowflake
	username: string
	discriminator: string
	avatar: string | null
	bot?: boolean
	system?: boolean
	mfa_enabled?: boolean
	locale?: string
	verified?: boolean
	email?: string | null
	flags?: number
	premium_type?: 0 | 1 | 2
	public_flags: number
}