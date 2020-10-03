import type { APIChannel, APIConnection, APIUser, GuildFeature } from "../mod.ts";

/**
 * https://discord.com/developers/docs/resources/user#get-current-user
 */
export type GetAPICurrentUserResult = APIUser;

/**
 * https://discord.com/developers/docs/resources/user#get-user
 */
export type GetAPIUserResult = APIUser;

/**
 * https://discord.com/developers/docs/resources/user#modify-current-user
 */
export interface PatchAPICurrentUserJSONBody {
	username?: string;
	avatar?: string | null;
}

export type PatchAPICurrentUserResult = APIUser;

/**
 * https://discord.com/developers/docs/resources/user#get-current-user-guilds
 */
export interface GetAPICurrentUserGuildsQuery {
	before?: string;
	after?: string;
	limit?: number;
}

export interface APIPartialCurrentUserGuild {
	id: string;
	name: string;
	icon: string | null;
	owner: boolean;
	features: GuildFeature[];
	/**
	 * @deprecated Use `permissions_new` instead
	 */
	permissions: number;
	permissions_new: string;
}

export type GetAPICurrentUserGuildsResult = APIPartialCurrentUserGuild[];

/**
 * https://discord.com/developers/docs/resources/user#leave-guild
 */
export type DeleteAPICurrentUserGuildResult = never;

/**
 * https://discord.com/developers/docs/resources/user#create-dm
 */
export interface PostAPICurrentUserCreateDMChannelJSONBody {
	recipient_id: string;
}

export type PostAPICurrentUserCreateDMChannelResult = APIChannel;

/**
 * https://discord.com/developers/docs/resources/user#get-user-connections
 */
export type GetAPICurrentUserConnectionsResult = APIConnection[];
