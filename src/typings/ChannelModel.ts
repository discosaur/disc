
export interface IBaseChannel
{
	id: string,
	type: ChannelType
}

export interface IBaseGuildChannel extends IBaseChannel
{
	guild_id: string,
	name: string,
	position: number,
	permission_overwrites: unknown[],
	nsfw: boolean,
	parent_id: string
}

export interface IGuildTextChannel extends IBaseGuildChannel
{
	topic: string,
	last_message_id: string,
	rate_limit_per_user: number
}

export interface IGuildNewsChannel extends IBaseGuildChannel
{
	topic: string,
	last_message_id: string
}

export interface IDmChannel
{
	last_message_id: string,
	recipients: IDmChannelRecipient[]
}

export interface IDmGroupChannel extends IDmChannel
{
	name: string;
	icon?: unknown | null;
	owner_id: string;
}

// deno-lint-ignore no-empty-interface
export interface ICategoryChannel extends IBaseGuildChannel
{}

// deno-lint-ignore no-empty-interface
interface IStoreChannel extends IBaseGuildChannel
{}

export interface IGuildVoiceChannel extends IBaseGuildChannel
{
	bitrate: number;
	user_limit: number;
}

export interface IDmChannelRecipient
{
	username: string;
	discriminator: string;
	id: string;
	avatar: string;
}

export enum ChannelType
{
	GUILD_TEXT = 0,
	DM = 1,
	GUILD_VOICE = 2,
	GROUP_DM = 3,
	GUILD_CATEGORY = 4,
	GUILD_NEWS = 5,
	GUILD_STORE = 6
}

export type anyChannelType =
	| IBaseChannel
	| IBaseGuildChannel
	| IGuildTextChannel
	| IGuildNewsChannel
	| IDmChannel
	| IDmGroupChannel
	| ICategoryChannel
	| IStoreChannel
	| IGuildVoiceChannel
	| IDmChannelRecipient;
