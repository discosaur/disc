
export interface IEmoji
{
	id: string | null,
	name?: string,
	roles?: string[],
	user?: string,
	require_colons?: boolean,
	managed?: boolean,
	animated?: boolean,
	available: boolean
}

export interface ICreateEmoji
{
	name: string,
	image: unknown,
	roles: string[]
}

export interface IModifyEmoji
{
	name: string,
	roles: string[]
}
