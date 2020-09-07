export type SocketEvent =
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
	 | "WEBHOOKS_UPDATE";

export type Snowflake = string;

export interface SocketData
{
	t: SocketEvent,
	s: number,
	op: number,
	d: DiscordStructure | SocketHello
}

export type DiscordStructure =
	| RawMessage
	| RawMember
	| RawUser
	| { session_id?: string };

export interface SocketHello
{
	heartbeat_interval: number
}

export interface RawMessage
{
	type: number
	tts: boolean
	timestamp: string
	pinned: boolean
	nonce?: Snowflake
	mentions: []
	mention_roles: []
	mention_everyone: boolean
	reactions: RawReaction[]
	member: RawMember
	id: Snowflake
	flags: number
	embeds: RawEmbed[]
	edited_timestamp: null | string
	content: string
	channel_id: Snowflake
	author: RawUser
	attachments: RawAttachment[]
	guild_id: Snowflake
	message_reference: RawMessageReference
}

export interface RawMessageReference
{
	channel_id: Snowflake
	guild_id: Snowflake
	message_id: Snowflake
}

export interface RawMember
{
	roles: Snowflake[]
	premium_since: null | string
	nick: null | string
	mute: boolean
	joined_at: string
	hoisted_role: Snowflake
	deaf: boolean
}

export interface RawUser
{
	username: string
	public_flags: number
	id: Snowflake
	discriminator: string
	avatar: string
}

export interface ExtendedRawUser extends RawUser
{
	email: null | string
	verified: boolean
	mfa_enabled: boolean
	bot: boolean
}

export interface RawReaction
{
	count: number
	me: boolean
	emoji: RawEmoji
}

export interface RawEmoji
{
	id: null | string
	name: string
}

export interface RawAttachment
{
	url: string
	size: number
	proxy_url: string
	id: Snowflake
	filename: string
}

export interface RawEmbed
{
	title?: string
	type?: string
	description?: string
	url?: string
	timestamp?: string
	color?: number
	footer?: RawEmbedFooter
	image?: RawEmbedImage
	thumbnail?: RawEmbedThumbnail
	video?: RawEmbedVideo
	provider?: RawEmbedProvider
	author: RawEmbedAuthor
	fields: RawEmbedField[]
}

export interface RawEmbedFooter
{
	text: string
	icon_url?: string
	proxy_icon_url?: string
}

export interface RawEmbedField
{
	name: string
	value: string
	inline?: boolean
}

export interface RawEmbedImage
{
	url?: string
	proxy_url?: string
	height?: number
	width?: number
}

export interface RawEmbedThumbnail
{
	url?: string
	proxy_url?: string
	height?: number
	width?: number
}

export interface RawEmbedVideo
{
	url?: string
	height?: string
	width: string
}

export interface RawEmbedProvider
{
	name?: string
	url?: string
}

export interface RawEmbedAuthor
{
	name?: string
	url?: string
	icon_url?: string
	proxy_icon_url?: string
}

export interface RawReadyData
{
	v: number
	user_settings: {}
	user: ExtendedRawUser
	session_id: string
	relationships: unknown[]
	private_channels: unknown[]
	presences: unknown[]
	guilds: {
		unavailable: boolean
		id: Snowflake
	}[]
	application: {
		id: Snowflake
		flags: number
	}
	_trace: string[]
}