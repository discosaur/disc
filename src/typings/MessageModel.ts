
export interface ICreateMessage
{
	content: string
	nonce: number | string
	tts: boolean
	file: unknown
	embed: unknown
	payload_json: string
	allowed_mentions: unknown
}

export interface IMessage
{
	id: string
	channel_id: string
	guild_id?: string
	author: unknown
	member?: unknown
	content: string
	timestamp: unknown
	edited_timestamp: unknown
	tts: boolean
	mention_everyone: boolean
	mentions: unknown[]
	mention_roles: unknown[]
	mention_channels: unknown[]
	attachments: unknown[]
	embeds: unknown[]
	reactions?: unknown[]
	nonce?: number | string
	pinned: boolean
	webhook_id?: string
	type: messageTypes
	activity?: unknown
	application?: unknown
	message_reference?: unknown
	flags?: number
}

enum messageTypes
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
