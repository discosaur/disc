export type Snowflake = string;

export interface ReadyData
{
	v: number
	user_settings: unknown // {}
	user: User
	session_id: string
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

export interface MemberChunk
{
	chunk_index: number
	chunk_count: number
	guild_id: Snowflake
	members: Member[]
}

export interface Guild
{
	id: Snowflake,
	name: string,
	description: string,
	icon?: string,
	splash: unknown | null,
	discovery_splash : unknown | null,
	features: string[],
	emojis: Emoji[],
	banner: string | null,
	owner_id: string,
	application_id: string | null
	region: string,
	afk_channel_id: string | null,
	afk_timeout: number,
	system_channel_id: Snowflake,
	widget_enabled: boolean
	widget_channel_id: Snowflake,
	verification_level: number
	members: Member[]
	roles: {
		id: Snowflake
		name: string
		permissions: number
		position: number
		color: number
		hoist: boolean
		managed: boolean
		mentionable: boolean,
		permissions_new: string
	}[],
	default_message_notifications: number,
	mfa_level: number,
	explicit_content_filter: number,
	max_presences: unknown | null,
	max_members: number,
	max_video_channel_users: number,
	vanity_url_code: unknown | null,
	premium_tier: number,
	premium_subscription_count: number,
	system_channel_flags: number,
	preferred_locale: Snowflake,
	rules_channel_id: Snowflake,
	public_updates_channel_id: Snowflake,
	embed_enabled: boolean,
	embed_channel_id: Snowflake
}

export interface User
{
	id: Snowflake
	username: string
	discriminator: string
	avatar: string | null
	bot?: boolean
	system?: boolean
	mfa_enabled?: boolean
	locale?: string
	verified?: boolean
	email?: string | null
	flags?: number
	premium_type?: 0 | 1 | 2
	public_flags: number
}

export interface Member
{
	user: User
	roles: Snowflake[],
	nick: string | null,
	premium_since?: string,
	joined_at: string,
	mute: boolean,
	deaf: boolean
}

export interface Message
{
	type: MessageType
	tts: boolean
	timestamp: string
	pinned: boolean
	nonce?: Snowflake
	mentions: User[]
	mention_roles: Snowflake[]
	mention_channels: Snowflake[]
	mention_everyone: boolean
	reactions: Reaction[]
	member?: Member
	id: Snowflake
	flags: number
	embeds: Embed[]
	edited_timestamp: null | string
	webhook_id?: string
	content: string
	channel_id: Snowflake
	author: User
	attachments: Attachment[]
	guild_id?: Snowflake
	message_reference: MessageReference
	activity?: unknown
	application?: unknown
}

export interface MessageReference
{
	channel_id: Snowflake
	guild_id: Snowflake
	message_id: Snowflake
}

export interface Reaction
{
	count: number
	me: boolean
	emoji: Emoji
}

export interface Emoji
{
	id: Snowflake | null,
	name: string | null,
	roles?: Snowflake[],
	user?: Snowflake,
	require_colons?: boolean,
	managed?: boolean,
	animated?: boolean,
	available?: boolean
}

export interface Attachment
{
	url: string
	size: number
	proxy_url: string
	id: Snowflake
	filename: string
}

enum MessageType
{
	"DEFAULT" = 0,
	"RECIPIENT_ADD" = 1,
	"RECIPIENT_REMOVE" = 2,
	"CALL" = 3,
	"CHANNEL_NAME_CHANGE" = 4,
	"CHANNEL_ICON_CHANGE" = 5,
	"CHANNEL_PINNED_MESSAGE" = 6,
	"GUILD_MEMBER_JOIN" = 7,
	"USER_PREMIUM_GUILD_SUBSCRIPTION" = 8,
	"USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1" = 9,
	"USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2" = 10,
	"USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3" = 11,
	"CHANNEL_FOLLOW_ADD" = 12,
	"GUILD_DISCOVERY_DISQUALIFIED" = 14,
	"GUILD_DISCOVERY_REQUALIFIED" = 15
}

export interface MessageOptions
{
	content: string
}

export interface Embed
{
	title?: string
	type?: string
	description?: string
	url?: string
	timestamp?: string
	color?: number
	footer?: EmbedFooter
	image?: EmbedImage
	thumbnail?: EmbedThumbnail
	video?: EmbedVideo
	provider?: EmbedProvider
	author?: EmbedAuthor
	fields?: EmbedField[]
}

export interface EmbedFooter
{
	text: string
	icon_url?: string
	proxy_icon_url?: string
}

export interface EmbedField
{
	name: string
	value: string
	inline?: boolean
}

export interface EmbedImage
{
	url: string
	proxy_url?: string
	height?: number
	width?: number
}

export interface EmbedThumbnail
{
	url: string
	proxy_url?: string
	height?: number
	width?: number
}

export interface EmbedVideo
{
	url: string
	height?: string
	width?: string
}

export interface EmbedProvider
{
	name?: string
	url?: string
}

export interface EmbedAuthor
{
	name: string
	url?: string
	icon_url?: string
	proxy_icon_url?: string
}

export interface Presence
{
	activities: [{
		name: string
		type: Activity
	}]
	since: number
	status: Status,
	afk: boolean
}

export enum Activity
{
	playing
}

export type Status =
	| "playing"
	| "dnd"
	| "idle"
	| "invisible";