import { SomeObject } from "../typings/mod.ts";

export type SocketEvent =
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

export interface SocketData
{
	t: SocketEvent,
	s: number,
	op: number,
	d: SomeObject
}

export interface DebugMessage
{
	message: string
}

export class SessionStore
{
	constructor(
		public acknowledged: boolean = false,
		public sequence: number | undefined = undefined,
		public id: string | null = null,
		public interval: number | undefined = undefined,
		public heartbeatTimestamp: number | undefined = undefined,
		public ping: number | undefined = undefined
	) { }
}

export enum opcodes
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