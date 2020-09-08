import { UserRes } from "./mod.ts";

export interface ClientUserRes extends UserRes
{
	email: null | string
	verified: boolean
	mfa_enabled: boolean
	bot: boolean
}