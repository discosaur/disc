import type { APIChannel, APIConnection, APIUser, GuildFeature } from "../mod.ts";

/**
 * https://discord.com/developers/docs/resources/user#get-current-user
 */
export type RestGetAPICurrentUserResult = APIUser;

/**
 * https://discord.com/developers/docs/resources/user#get-user
 */
export type RestGetAPIUserResult = APIUser;

/**
 * https://discord.com/developers/docs/resources/user#modify-current-user
 */
export interface RestPatchAPICurrentUserJSONBody {
	username?: string;
	avatar?: string | null;
}

export type RestPatchAPICurrentUserResult = APIUser;

/**
 * https://discord.com/developers/docs/resources/user#get-current-user-guilds
 */
export interface RestGetAPICurrentUserGuildsQuery {
	before?: string;
	after?: string;
	limit?: number;
}

export interface RestAPIPartialCurrentUserGuild {
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

export type RestGetAPICurrentUserGuildsResult = RestAPIPartialCurrentUserGuild[];

/**
 * https://discord.com/developers/docs/resources/user#leave-guild
 */
export type RestDeleteAPICurrentUserGuildResult = never;

/**
 * https://discord.com/developers/docs/resources/user#create-dm
 */
export interface RestPostAPICurrentUserCreateDMChannelJSONBody {
	recipient_id: string;
}

export type RestPostAPICurrentUserCreateDMChannelResult = APIChannel;

/**
 * https://discord.com/developers/docs/resources/user#get-user-connections
 */
export type RestGetAPICurrentUserConnectionsResult = APIConnection[];
