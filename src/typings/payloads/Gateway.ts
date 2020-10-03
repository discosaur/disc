/**
 * Types extracted from https://discord.com/developers/docs/topics/gateway
 */

import type { APIEmoji, APIUser } from "../mod.ts";

/**
 * https://discord.com/developers/docs/topics/gateway#get-gateway
 */
export interface APISocketInfo {
	url: string;
}

/**
 * https://discord.com/developers/docs/topics/gateway#get-gateway-bot
 */
export interface APISocketBotInfo extends APISocketInfo {
	shards: number;
	session_start_limit: APISocketSessionStartLimit;
}

/**
 * https://discord.com/developers/docs/topics/gateway#session-start-limit-object
 */
export interface APISocketSessionStartLimit {
	total: number;
	remaining: number;
	reset_after: number;
}

/**
 * https://discord.com/developers/docs/topics/gateway#presence-update-presence-update-event-fields
 */
export interface SocketPresenceUpdate {
	user: Partial<APIUser> & {
		id: string;
	};
	roles?: string[];
	game?: SocketActivity | null;
	guild_id?: string;
	status?: PresenceUpdateStatus;
	activities?: SocketActivity[];
	client_status?: SocketPresenceClientStatus;
	premium_since?: string | null;
	nick?: string | null;
}

export enum PresenceUpdateStatus {
	DoNotDisturb = "dnd",
	Idle = "idle",
	Invisible = "invisible",
	Offline = "offline",
	Online = "online",
}

/**
 * https://discord.com/developers/docs/topics/gateway#client-status-object
 */
export type SocketPresenceClientStatus = Partial<Record<"desktop" | "mobile" | "web", PresenceUpdateStatus>>;

/**
 * https://discord.com/developers/docs/topics/gateway#activity-object
 */
export interface SocketActivity {
	name: string;
	type: ActivityType;
	url?: string | null;
	created_at: number;
	timestamps?: SocketActivityTimestamps;
	application_id?: string;
	details?: string | null;
	state?: string | null;
	emoji?: SocketActivityEmoji;
	party?: SocketActivityParty;
	assets?: SocketActivityAssets;
	secrets?: SocketActivitySecrets;
	instance?: boolean;
	flags?: ActivityFlags;
}

/**
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
 */
export enum ActivityType {
	Game,
	Streaming,
	Listening,

	Custom = 4,
}

/**
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps
 */
export interface SocketActivityTimestamps {
	start?: number;
	end?: number;
}

/**
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji
 */
export type SocketActivityEmoji = Partial<Pick<APIEmoji, "name" | "animated">> & Pick<APIEmoji, "id">;

/**
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-party
 */
export interface SocketActivityParty {
	id?: string;
	// eslint-disable-next-line prettier/prettier
	size?: [currentSize: number, maxSize: number];
}

/**
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets
 */
export type SocketActivityAssets = Partial<
	Record<"large_image" | "large_text" | "small_image" | "small_text", string>
>;

/**
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets
 */
export type SocketActivitySecrets = Partial<Record<"join" | "spectate" | "match", string>>;

/**
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags
 */
export enum ActivityFlags {
	INSTANCE = 1 << 0,
	JOIN = 1 << 1,
	SPECTATE = 1 << 2,
	JOIN_REQUEST = 1 << 3,
	SYNC = 1 << 4,
	PLAY = 1 << 5,
}
