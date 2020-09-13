import type {
	APIChannel,
	APIEmbed,
	APIFollowedChannel,
	APIInvite,
	APIMessage,
	APIOverwrite,
	APIUser,
	ChannelType,
	InviteTargetUserType,
	MessageFlags,
	OverwriteType,
} from "../mod.ts";

// #region TypeDefs

/**
 * https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure
 */
export interface APIOverwriteSend {
	id: string;
	type: OverwriteType;
	allow: number | string;
	deny: number | string;
}

/**
 * https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types
 */
export enum AllowedMentionsTypes {
	Everyone = "everyone",
	Role = "roles",
	User = "users",
}

/**
 * https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure
 */
export interface APIAllowedMentionsSend {
	parse?: AllowedMentionsTypes[];
	roles?: string[];
	users?: string[];
}

// #endregion TypeDefs

/**
 * https://discord.com/developers/docs/resources/channel#modify-channel
 */
export interface PatchAPIChannelJSONBody {
	name?: string;
	type?: ChannelType.GUILD_NEWS | ChannelType.GUILD_TEXT;
	position?: number | null;
	topic?: string | null;
	nsfw?: boolean | null;
	rate_limit_per_user?: number | null;
	user_limit?: number | null;
	permission_overwrites?: APIOverwrite[] | null;
	parent_id?: string | null;
}

export type GetAPIChannelResult = APIChannel;
export type PatchAPIChannelResult = APIChannel;
export type DeleteAPIChannelResult = APIChannel;

/**
 * https://discord.com/developers/docs/resources/channel#get-channel-messages
 */
export interface GetAPIChannelMessagesQuery {
	around?: string;
	before?: string;
	after?: string;
	limit?: number;
}

export type GetAPIChannelMessagesResult = APIMessage[];

/**
 * https://discord.com/developers/docs/resources/channel#create-message
 */
export interface PostAPIChannelMessageJSONBody {
	content?: string;
	nonce?: number | string;
	tts?: boolean;
	embed?: APIEmbed;
	allowed_mentions?: APIAllowedMentionsSend;
}

/**
 * https://discord.com/developers/docs/resources/channel#create-message
 */
export type PostAPIChannelMessageFormDataBody =
	| {
			/**
			 * JSON stringified message body
			 */
			payload_json?: string;
			/**
			 * The file contents
			 */
			file: unknown;
	  }
	| {
			content?: string;
			nonce?: number | string;
			tts?: boolean;
			embed?: APIEmbed;
			allowed_mentions?: APIAllowedMentionsSend;
			/**
			 * The file contents
			 */
			file: unknown;
	  };

/**
 * https://discord.com/developers/docs/resources/channel#edit-message
 */
export interface PatchAPIChannelMessageJSONBody {
	content?: string | null;
	embed?: APIEmbed | null;
	allowed_mentions?: APIAllowedMentionsSend | null;
	flags?: MessageFlags | null;
}

export type GetAPIChannelMessageResult = APIMessage;
export type PostAPIChannelMessageResult = APIMessage;
export type PatchAPIChannelMessageResult = APIMessage;
export type DeleteAPIChannelMessageResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#get-reactions
 */
export interface GetAPIChannelMessageReactionsQuery {
	before?: string;
	after?: string;
	limit?: number;
}

export type GetAPIChannelMessageReactionsResult = APIUser[];

export type PutAPIChannelMessageReactionResult = never;
export type DeleteAPIChannelMessageReactionResult = never;
export type DeleteAPIChannelAllMessageReactionsResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#bulk-delete-messages
 */
export interface PostAPIChannelMessagesBulkDeleteJSONBody {
	messages: string[];
}

export type PostAPIChannelMessagesBulkDeleteResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#edit-channel-permissions
 */
export interface PutAPIChannelPermissionsJSONBody {
	allow: number | string;
	deny: number | string;
	type: OverwriteType;
}

export type PutAPIChannelPermissionsResult = never;
export type DeleteAPIChannelPermissionsResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#get-channel-invites
 */
export type GetAPIChannelInvitesResult = APIInvite[];

export interface PostAPIChannelInviteJSONBody {
	max_age?: number;
	max_uses?: number;
	temporary?: boolean;
	unique?: boolean;
	target_user_id?: string;
	target_user_type?: InviteTargetUserType;
}

/**
 * https://discord.com/developers/docs/resources/channel#trigger-typing-indicator
 */
export type PostAPIChannelTypingResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#get-pinned-messages
 */
export type GetAPIChannelPinsResult = APIMessage[];

/**
 * https://discord.com/developers/docs/resources/channel#add-pinned-channel-message
 */
export type PutAPIChannelPinResult = never;
export type DeleteAPIChannelPinResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
 */
export interface PutAPIChannelRecipientJSONBody {
	access_token: string;
	nick?: string;
}

export type PutAPIChannelRecipientResult = unknown;
export type DeleteAPIChannelRecipientResult = unknown;

// TODO: Docs updated once https://github.com/discord/discord-api-docs/pull/1692/files is merged

export type PostAPIChannelMessageCrosspostResult = APIMessage;

export interface PostAPIChannelFollowersJSONBody {
	webhook_channel_id: string;
}

export type PostAPIChannelFollowersResult = APIFollowedChannel;
