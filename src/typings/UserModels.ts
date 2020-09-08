
export interface IGetUser
{
	id: string,
	username: string,
	avatar: string | null,
	discriminator: string,
	public_flags: number
}

export interface IGetUserMe extends IGetUser
{
	flags: number,
	bot: boolean,
	email: string | null,
	verified: boolean,
	locale: "en-US",
	mfa_enabled: boolean
}

export interface IPatchUserMe
{
	username?: string,
	avatar?: unknown
}

export interface IConnection
{
	id: string,
	name: string,
	type: string,
	revoked?: boolean,
	integrations?: unknown[],
	verified: boolean,
	friend_sync: boolean,
	show_activity: boolean,
	visibility: 0 | 1 | number
}

export interface IUser
{
	id: string
	username: string
	discriminator: string
	avatar?: string | null
	bot?: boolean
	system?: boolean
	mfa_enabled?: boolean
	locale?: string
	verified?: boolean
	email?: string | null
	flags?: number
	premium_type?: 0 | 1 | 2 | number
	public_flags?: number
}
