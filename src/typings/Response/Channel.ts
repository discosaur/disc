import { UserRes } from "./User.ts";

export interface BaseChannelRes
{
	id: string,
	type: ChannelType
}

export interface BaseGuildChannelRes extends BaseChannelRes
{
	guild_id: string,
	name: string,
	position: number,
	permission_overwrites: unknown[],
	nsfw: boolean,
	parent_id: string
}

export interface GuildTextChannelRes extends BaseGuildChannelRes
{
	topic: string,
	last_message_id: string,
	rate_limit_per_user: number
}

export interface GuildNewsChannelRes extends BaseGuildChannelRes
{
	topic: string,
	last_message_id: string
}

export interface DmChannelRes
{
	last_message_id: string,
	recipients: UserRes[]
}

export interface DmGroupChannelRes extends DmChannelRes
{
	name: string;
	icon?: unknown | null;
	owner_id: string;
}

// deno-lint-ignore no-empty-interface
export interface GuildCategoryChannelRes extends BaseGuildChannelRes { }

// deno-lint-ignore no-empty-interface
interface GuildStoreChannelRes extends BaseGuildChannelRes { }

export interface GuildVoiceChannelRes extends BaseGuildChannelRes
{
	bitrate: number;
	user_limit: number;
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

export type SomeChannel =
	| BaseChannelRes
	| BaseGuildChannelRes
	| GuildTextChannelRes
	| GuildNewsChannelRes
	| DmChannelRes
	| DmGroupChannelRes
	| GuildCategoryChannelRes
	| GuildStoreChannelRes
	| GuildVoiceChannelRes
	| UserRes;
