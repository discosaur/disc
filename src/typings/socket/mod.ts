/**
 * Types extracted from https://discord.com/developers/docs/topics/gateway
 */

import type {
	APIChannel,
	APIEmoji,
	APIGuild,
	APIGuildMember,
	APIMessage,
	APIRole,
	APIUnavailableGuild,
	APIUser,
	SocketActivity,
	SocketPresenceUpdate as RawSocketPresenceUpdate,
	SocketVoiceState,
	InviteTargetUserType,
	PresenceUpdateStatus,
} from "../payloads/mod.ts";

/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
 */
export enum SocketCloseCodes
{
	UnknownError = 4000,
	UnknownOpCode,
	DecodeError,
	NotAuthenticated,
	AuthenticationFailed,
	AlreadyAuthenticated,

	InvalidSeq = 4007,
	RateLimited,
	SessionTimedOut,
	InvalidShard,
	ShardingRequired,
	InvalidAPIVersion,
	InvalidIntents,
	DisallowedIntents,
}

/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
 */
export enum SocketOPCodes
{
	EVENT = 0,
	HEARTBEAT = 1,
	IDENTIFY = 2,
	PRESENCE_UPDATE = 3,
	VOICE_UPDATE = 4,
	RESUME = 6,
	RECONNECT = 7,
	REQUEST_MEMBERS = 8,
	INVALIDATED = 9,
	HELLO = 10,
	HEARTBEAT_ACK = 11
}

/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes
 */
export enum VoiceSocketOPCodes
{
	Identify,
	SelectProtocol,
	Ready,
	Heartbeat,
	SessionDescription,
	Speaking,
	HeartbeatAck,
	Resume,
	Hello,
	Resumed,

	ClientDisconnect = 13,
}

/**
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes
 */
export enum VoiceSocketCloseCodes {
	UnknownOpCode = 4001,

	NotAuthenticated = 4003,
	AuthenticationFailed,
	AlreadyAuthenticated,
	SessionNoLongerValid,

	SessionTimeout = 4009,

	ServerNotFound = 4011,
	UnknownProtocol,

	Disconnected = 4014,
	VoiceServerCrashed,
	UnknownEncryptionMode,
}

/**
 * https://discord.com/developers/docs/topics/gateway#list-of-intents
 */
export enum SocketIntentBits {
	GUILDS = 1 << 0,
	GUILD_MEMBERS = 1 << 1,
	GUILD_BANS = 1 << 2,
	GUILD_EMOJIS = 1 << 3,
	GUILD_INTEGRATIONS = 1 << 4,
	GUILD_WEBHOOKS = 1 << 5,
	GUILD_INVITES = 1 << 6,
	GUILD_VOICE_STATES = 1 << 7,
	GUILD_PRESENCES = 1 << 8,
	GUILD_MESSAGES = 1 << 9,
	GUILD_MESSAGE_REACTIONS = 1 << 10,
	GUILD_MESSAGE_TYPING = 1 << 11,
	DIRECT_MESSAGES = 1 << 12,
	DIRECT_MESSAGE_REACTIONS = 1 << 13,
	DIRECT_MESSAGE_TYPING = 1 << 14,
}

/**
 * https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events
 */
export enum SocketDispatchEvents {
	Ready = "READY",
	Resumed = "RESUMED",
	ChannelCreate = "CHANNEL_CREATE",
	ChannelUpdate = "CHANNEL_UPDATE",
	ChannelDelete = "CHANNEL_DELETE",
	ChannelPinsUpdate = "CHANNEL_PINS_UPDATE",
	GuildCreate = "GUILD_CREATE",
	GuildUpdate = "GUILD_UPDATE",
	GuildDelete = "GUILD_DELETE",
	GuildBanAdd = "GUILD_BAN_ADD",
	GuildBanRemove = "GUILD_BAN_REMOVE",
	GuildEmojisUpdate = "GUILD_EMOJIS_UPDATE",
	GuildIntegrationsUpdate = "GUILD_INTEGRATIONS_UPDATE",
	GuildMemberAdd = "GUILD_MEMBER_ADD",
	GuildMemberRemove = "GUILD_MEMBER_REMOVE",
	GuildMemberUpdate = "GUILD_MEMBER_UPDATE",
	GuildMembersChunk = "GUILD_MEMBERS_CHUNK",
	GuildRoleCreate = "GUILD_ROLE_CREATE",
	GuildRoleUpdate = "GUILD_ROLE_UPDATE",
	GuildRoleDelete = "GUILD_ROLE_DELETE",
	InviteCreate = "INVITE_CREATE",
	InviteDelete = "INVITE_DELETE",
	MessageCreate = "MESSAGE_CREATE",
	MessageUpdate = "MESSAGE_UPDATE",
	MessageDelete = "MESSAGE_DELETE",
	MessageDeleteBulk = "MESSAGE_DELETE_BULK",
	MessageReactionAdd = "MESSAGE_REACTION_ADD",
	MessageReactionRemove = "MESSAGE_REACTION_REMOVE",
	MessageReactionRemoveAll = "MESSAGE_REACTION_REMOVE_ALL",
	MessageReactionRemoveEmoji = "MESSAGE_REACTION_REMOVE_EMOJI",
	PresenceUpdate = "PRESENCE_UPDATE",
	TypingStart = "TYPING_START",
	UserUpdate = "USER_UPDATE",
	VoiceStateUpdate = "VOICE_STATE_UPDATE",
	VoiceServerUpdate = "VOICE_SERVER_UPDATE",
	WebhooksUpdate = "WEBHOOKS_UPDATE",
}

export type SocketDispatchEventsName =
	// raw discord events
	| "READY"
	| "CHANNEL_CREATE"
	| "CHANNEL_DELETE"
	| "CHANNEL_UPDATE"
	| "CHANNEL_PINS_UPGRADE"
	| "GUILD_CREATE"
	| "GUILD_DELETE"
	| "GUILD_BAN_ADD"
	| "GUILD_BAN_REMOVE"
	| "GUILD_EMOJIS_UPDATE"
	| "GUILD_INTEGRATIONS_UPDATE"
	| "GUILD_MEMBER_ADD"
	| "GUILD_MEMBER_REMOVE"
	| "GUILD_MEMBER_UPDATE"
	| "GUILD_MEMBERS_CHUNK"
	| "GUILD_ROLE_CREATE"
	| "GUILD_ROLE_DELETE"
	| "GUILD_ROLE_UPDATE"
	| "GUILD_UPDATE"
	| "INVITE_CREATE"
	| "INVITE_DELETE"
	| "MESSAGE_CREATE"
	| "MESSAGE_DELETE"
	| "MESSAGE_UPDATE"
	| "MESSAGE_DELETE_BULK"
	| "MESSAGE_REACTION_ADD"
	| "MESSAGE_REACTION_REMOVE"
	| "MESSAGE_REACTION_REMOVE_ALL"
	| "MESSAGE_REACTION_REMOVE_EMOJI"
	| "PRESENCE_UPDATE"
	| "TYPING_START"
	| "USER_UPDATE"
	| "VOICE_STATE_UPDATE"
	| "VOICE_SERVER_UPDATE"
	| "WEBHOOKS_UPDATE"
	// self-defined events for utility
	| "INVALIDATED"
	| "DEBUG";

export type SocketSendPayload =
	| SocketHeartbeat
	| SocketIdentify
	| SocketUpdatePresence
	| SocketVoiceStateUpdate
	| SocketResume
	| SocketRequestGuildMembers;

export type SocketReceivePayload =
	| SocketHello
	| SocketHeartbeatRequest
	| SocketHeartbeatAck
	| SocketInvalidSession
	| SocketReconnect
	| SocketDispatchPayload;

export type SocketDispatchPayload =
	| SocketReadyDispatch
	| SocketResumedDispatch
	| SocketChannelModifyDispatch
	| SocketChannelPinsUpdateDispatch
	| SocketGuildModifyDispatch
	| SocketGuildDeleteDispatch
	| SocketGuildBanModifyDispatch
	| SocketGuildEmojisUpdateDispatch
	| SocketGuildIntegrationsUpdateDispatch
	| SocketGuildMemberAddDispatch
	| SocketGuildMemberRemoveDispatch
	| SocketGuildMemberUpdateDispatch
	| SocketGuildMembersChunkDispatch
	| SocketGuildRoleModifyDispatch
	| SocketGuildRoleDeleteDispatch
	| SocketInviteCreateDispatch
	| SocketInviteDeleteDispatch
	| SocketMessageCreateDispatch
	| SocketMessageUpdateDispatch
	| SocketMessageDeleteDispatch
	| SocketMessageDeleteBulkDispatch
	| SocketMessageReactionAddDispatch
	| SocketMessageReactionRemoveDispatch
	| SocketMessageReactionRemoveAllDispatch
	| SocketMessageReactionRemoveEmojiDispatch
	| SocketPresenceUpdateDispatch
	| SocketTypingStartDispatch
	| SocketUserUpdateDispatch
	| SocketVoiceStateUpdateDispatch
	| SocketVoiceServerUpdateDispatch
	| SocketWebhooksUpdateDispatch;

// #region Dispatch Payloads
/**
 * https://discord.com/developers/docs/topics/gateway#hello
 */
export interface SocketHello extends NonDispatchPayload {
	op: SocketOPCodes.HELLO;
	d: {
		heartbeat_interval: number;
	};
}

/**
 * https://discord.com/developers/docs/topics/gateway#heartbeating
 */
export interface SocketHeartbeatRequest extends NonDispatchPayload {
	op: SocketOPCodes.HEARTBEAT;
	d: never;
}

/**
 * https://discord.com/developers/docs/topics/gateway#heartbeating-example-gateway-heartbeat-ack
 */
export interface SocketHeartbeatAck extends NonDispatchPayload {
	op: SocketOPCodes.HEARTBEAT_ACK;
	d: never;
}

/**
 * https://discord.com/developers/docs/topics/gateway#invalid-session
 */
export interface SocketInvalidSession extends NonDispatchPayload {
	op: SocketOPCodes.INVALIDATED;
	d: boolean;
}

/**
 * https://discord.com/developers/docs/topics/gateway#reconnect
 */
export interface SocketReconnect extends NonDispatchPayload {
	op: SocketOPCodes.RECONNECT;
	d: never;
}

/**
 * https://discord.com/developers/docs/topics/gateway#ready
 */
export type SocketReadyDispatch = DataPayload<
	SocketDispatchEvents.Ready,
	{
		v: number;
		user: APIUser;
		session_id: string;
		private_channels: [];
		guilds: APIUnavailableGuild[];
		shard?: [number, number];
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#resumed
 */
export type SocketResumedDispatch = DataPayload<SocketDispatchEvents.Resumed, never>;

/* eslint-disable @typescript-eslint/indent */
/**
 * https://discord.com/developers/docs/topics/gateway#channel-create
 * https://discord.com/developers/docs/topics/gateway#channel-update
 * https://discord.com/developers/docs/topics/gateway#channel-delete
 */
export type SocketChannelModifyDispatch = DataPayload<
	SocketDispatchEvents.ChannelCreate | SocketDispatchEvents.ChannelDelete | SocketDispatchEvents.ChannelUpdate,
	APIChannel
>;
/* eslint-enable @typescript-eslint/indent */

export type SocketChannelCreateDispatch = SocketChannelModifyDispatch;
export type SocketChannelUpdateDispatch = SocketChannelModifyDispatch;
export type SocketChannelDeleteDispatch = SocketChannelModifyDispatch;

/**
 * https://discord.com/developers/docs/topics/gateway#channel-pins-update
 */
export type SocketChannelPinsUpdateDispatch = DataPayload<
	SocketDispatchEvents.ChannelPinsUpdate,
	{
		guild_id?: string;
		channel_id: string;
		last_pin_timestamp?: string;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-create
 * https://discord.com/developers/docs/topics/gateway#guild-update
 */
export type SocketGuildModifyDispatch = DataPayload<
	SocketDispatchEvents.GuildCreate | SocketDispatchEvents.GuildUpdate,
	APIGuild
>;

export type SocketGuildCreateDispatch = SocketGuildModifyDispatch;
export type SocketGuildUpdateDispatch = SocketGuildModifyDispatch;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-delete
 */
export type SocketGuildDeleteDispatch = DataPayload<SocketDispatchEvents.GuildDelete, APIUnavailableGuild>;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-ban-add
 * https://discord.com/developers/docs/topics/gateway#guild-ban-remove
 */
export type SocketGuildBanModifyDispatch = DataPayload<
	SocketDispatchEvents.GuildBanAdd | SocketDispatchEvents.GuildBanRemove,
	{
		guild_id: string;
		user: APIUser;
	}
>;

export type SocketGuildBanAddDispatch = SocketGuildBanModifyDispatch;
export type SocketGuildBanRemoveDispatch = SocketGuildBanModifyDispatch;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-emojis-update
 */
export type SocketGuildEmojisUpdateDispatch = DataPayload<
	SocketDispatchEvents.GuildEmojisUpdate,
	{
		guild_id: string;
		emojis: APIEmoji[];
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-integrations-update
 */
export type SocketGuildIntegrationsUpdateDispatch = DataPayload<
	SocketDispatchEvents.GuildIntegrationsUpdate,
	{ guild_id: string }
>;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-member-add
 */
export type SocketGuildMemberAddDispatch = DataPayload<
	SocketDispatchEvents.GuildMemberAdd,
	APIGuildMember & { guild_id: string }
>;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-member-remove
 */
export type SocketGuildMemberRemoveDispatch = DataPayload<
	SocketDispatchEvents.GuildMemberRemove,
	{
		guild_id: string;
		user: APIUser;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-member-update
 */
export type SocketGuildMemberUpdateDispatch = DataPayload<
	SocketDispatchEvents.GuildMemberUpdate,
	Omit<APIGuildMember, "deaf" | "mute"> & {
		guild_id: string;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-members-chunk
 */
export type SocketGuildMembersChunkDispatch = DataPayload<
	SocketDispatchEvents.GuildMembersChunk,
	{
		guild_id: string;
		members: APIGuildMember[];
		chunk_index?: number;
		chunk_count?: number;
		not_found?: unknown[];
		presences?: RawSocketPresenceUpdate[];
		nonce?: string;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-role-create
 * https://discord.com/developers/docs/topics/gateway#guild-role-update
 */
export type SocketGuildRoleModifyDispatch = DataPayload<
	SocketDispatchEvents.GuildRoleCreate | SocketDispatchEvents.GuildRoleUpdate,
	{
		guild_id: string;
		role: APIRole;
	}
>;

export type SocketGuildRoleCreateDispatch = SocketGuildRoleModifyDispatch;
export type SocketGuildRoleUpdateDispatch = SocketGuildRoleModifyDispatch;

/**
 * https://discord.com/developers/docs/topics/gateway#guild-role-delete
 */
export type SocketGuildRoleDeleteDispatch = DataPayload<
	SocketDispatchEvents.GuildRoleDelete,
	{
		guild_id: string;
		role_id: string;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#invite-create
 */
export type SocketInviteCreateDispatch = DataPayload<
	SocketDispatchEvents.InviteCreate,
	{
		channel_id: string;
		code: string;
		created_at: number;
		guild_id?: string;
		inviter?: APIUser;
		max_age: number;
		max_uses: number;
		target_user?: APIUser;
		target_user_type?: InviteTargetUserType;
		temporary: boolean;
		uses: 0;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#invite-delete
 */
export type SocketInviteDeleteDispatch = DataPayload<
	SocketDispatchEvents.InviteDelete,
	{
		channel_id: string;
		guild_id?: string;
		code: string;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#message-create
 */
export type SocketMessageCreateDispatch = DataPayload<SocketDispatchEvents.MessageCreate, APIMessage>;

/**
 * https://discord.com/developers/docs/topics/gateway#message-update
 */
export type SocketMessageUpdateDispatch = DataPayload<
	SocketDispatchEvents.MessageUpdate,
	{ id: string; channel_id: string } & Partial<APIMessage>
>;

/**
 * https://discord.com/developers/docs/topics/gateway#message-delete
 */
export type SocketMessageDeleteDispatch = DataPayload<
	SocketDispatchEvents.MessageDelete,
	{
		id: string;
		channel_id: string;
		guild_id?: string;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#message-delete-bulk
 */
export type SocketMessageDeleteBulkDispatch = DataPayload<
	SocketDispatchEvents.MessageDeleteBulk,
	{
		ids: string[];
		channel_id: string;
		guild_id?: string;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#message-reaction-add
 */
export type SocketMessageReactionAddDispatch = ReactionData<SocketDispatchEvents.MessageReactionAdd>;

/**
 * https://discord.com/developers/docs/topics/gateway#message-reaction-remove
 */
export type SocketMessageReactionRemoveDispatch = ReactionData<SocketDispatchEvents.MessageReactionRemove, "member">;

/**
 * https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all
 */
export type SocketMessageReactionRemoveAllDispatch = DataPayload<
	SocketDispatchEvents.MessageReactionRemoveAll,
	MessageReactionRemoveData
>;

/**
 * https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji
 */
export type SocketMessageReactionRemoveEmojiDispatch = DataPayload<
	SocketDispatchEvents.MessageReactionRemoveEmoji,
	MessageReactionRemoveData & {
		emoji: APIEmoji;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#presence-update
 */
export type SocketPresenceUpdateDispatch = DataPayload<SocketDispatchEvents.PresenceUpdate, RawSocketPresenceUpdate>;

/**
 * https://discord.com/developers/docs/topics/gateway#typing-start
 */
export type SocketTypingStartDispatch = DataPayload<
	SocketDispatchEvents.TypingStart,
	{
		channel_id: string;
		guild_id?: string;
		user_id: string;
		timestamp: number;
		member?: APIGuildMember;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#user-update
 */
export type SocketUserUpdateDispatch = DataPayload<SocketDispatchEvents.UserUpdate, APIUser>;

/**
 * https://discord.com/developers/docs/topics/gateway#voice-state-update
 */
export type SocketVoiceStateUpdateDispatch = DataPayload<SocketDispatchEvents.VoiceStateUpdate, SocketVoiceState>;

/**
 * https://discord.com/developers/docs/topics/gateway#voice-server-update
 */
export type SocketVoiceServerUpdateDispatch = DataPayload<
	SocketDispatchEvents.VoiceServerUpdate,
	{
		token: string;
		guild_id: string;
		endpoint: string;
	}
>;

/**
 * https://discord.com/developers/docs/topics/gateway#webhooks-update
 */
export type SocketWebhooksUpdateDispatch = DataPayload<
	SocketDispatchEvents.WebhooksUpdate,
	{
		guild_id: string;
		channel_id: string;
	}
>;

// #endregion Dispatch Payloads

// #region Sendable Payloads

/**
 * https://discord.com/developers/docs/topics/gateway#heartbeating
 */
export interface SocketHeartbeat {
	op: SocketOPCodes.HEARTBEAT;
	d: number;
}

/**
 * https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties
 */
export interface SocketIdentifyProperties {
	$os: string;
	$browser: string;
	device: string;
}

/**
 * https://discord.com/developers/docs/topics/gateway#identify
 */
export interface SocketIdentify {
	op: SocketOPCodes.IDENTIFY;
	d: {
		token: string;
		properties: SocketIdentifyProperties;
		compress?: boolean;
		large_threshold?: number;
		// eslint-disable-next-line prettier/prettier
		shard?: [shard_id: number, shard_count: number];
		presence?: RawSocketPresenceUpdate;
		guild_subscriptions?: boolean;
		intents?: number;
	};
}

/**
 * https://discord.com/developers/docs/topics/gateway#resume
 */
export interface SocketResume {
	op: SocketOPCodes.RESUME;
	d: {
		token: string;
		session_id: string;
		seq: number;
	};
}

/**
 * https://discord.com/developers/docs/topics/gateway#request-guild-members
 */
export interface SocketRequestGuildMembers {
	op: SocketOPCodes.REQUEST_MEMBERS;
	d: {
		guild_id: string | string[];
		query?: string;
		limit: number;
		presences?: boolean;
		user_ids?: string | string[];
		nonce?: string;
	};
}

/**
 * https://discord.com/developers/docs/topics/gateway#update-voice-state
 */
export interface SocketVoiceStateUpdate {
	op: SocketOPCodes.VOICE_UPDATE;
	d: {
		guild_id: string;
		channel_id: string | null;
		self_mute: boolean;
		self_deaf: boolean;
	};
}

/**
 * https://discord.com/developers/docs/topics/gateway#update-status
 */
export interface SocketUpdatePresence {
	op: SocketOPCodes.PRESENCE_UPDATE;
	d: SocketPresenceUpdateData;
}

/**
 * https://discord.com/developers/docs/topics/gateway#update-status-gateway-status-update-structure
 */
export interface SocketPresenceUpdateData {
	since: number | null;
	game: SocketActivity | null;
	status: PresenceUpdateStatus;
	afk: boolean;
}

// #endregion Sendable Payloads

// #region Shared
interface BasePayload
{
	op: SocketOPCodes;
	s: number;
	d?: unknown;
	t?: string;
}

type NonDispatchPayload = Omit<BasePayload, "t">;

interface DataPayload<Event extends SocketDispatchEvents, D = unknown> extends BasePayload
{
	op: SocketOPCodes.EVENT;
	t: Event;
	d: D;
}

type ReactionData<E extends SocketDispatchEvents, O extends string = never> = DataPayload<
	E,
	Omit<
		{
			user_id: string;
			channel_id: string;
			message_id: string;
			guild_id?: string;
			member?: APIGuildMember;
			emoji: APIEmoji;
		},
		O
	>
>;

interface MessageReactionRemoveData {
	channel_id: string;
	message_id: string;
	guild_id?: string;
}
// #endregion Shared
