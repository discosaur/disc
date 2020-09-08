import { AttachmentRes, Embed, MemberRes, MessageReferenceRes, ReactionRes, Snowflake, UserRes } from "../mod.ts";

export interface MessageRes
{
	type: MessageType
	tts: boolean
	timestamp: string
	pinned: boolean
	nonce?: Snowflake
	mentions: []
	mention_roles: []
	mention_channels: []
	mention_everyone: boolean
	reactions: ReactionRes[]
	member?: MemberRes
	id: Snowflake
	flags: number
	embeds: Embed[]
	edited_timestamp: null | string
	webhook_id?: string
	content: string
	channel_id: Snowflake
	author: UserRes
	attachments: AttachmentRes[]
	guild_id?: Snowflake
	message_reference: MessageReferenceRes
	activity?: unknown
	application?: unknown
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