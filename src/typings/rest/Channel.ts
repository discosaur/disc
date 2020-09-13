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
export interface RestPatchAPIChannelJSONBody {
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

export type RestGetAPIChannelResult = APIChannel;
export type RestPatchAPIChannelResult = APIChannel;
export type RestDeleteAPIChannelResult = APIChannel;

/**
 * https://discord.com/developers/docs/resources/channel#get-channel-messages
 */
export interface RestGetAPIChannelMessagesQuery {
	around?: string;
	before?: string;
	after?: string;
	limit?: number;
}

export type RestGetAPIChannelMessagesResult = APIMessage[];

/**
 * https://discord.com/developers/docs/resources/channel#create-message
 */
export interface RestPostAPIChannelMessageJSONBody {
	content?: string;
	nonce?: number | string;
	tts?: boolean;
	embed?: APIEmbed;
	allowed_mentions?: APIAllowedMentionsSend;
}

/**
 * https://discord.com/developers/docs/resources/channel#create-message
 */
export type RestPostAPIChannelMessageFormDataBody =
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
export interface RestPatchAPIChannelMessageJSONBody {
	content?: string | null;
	embed?: APIEmbed | null;
	allowed_mentions?: APIAllowedMentionsSend | null;
	flags?: MessageFlags | null;
}

export type RestGetAPIChannelMessageResult = APIMessage;
export type RestPostAPIChannelMessageResult = APIMessage;
export type RestPatchAPIChannelMessageResult = APIMessage;
export type RestDeleteAPIChannelMessageResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#get-reactions
 */
export interface RestGetAPIChannelMessageReactionsQuery {
	before?: string;
	after?: string;
	limit?: number;
}

export type RestGetAPIChannelMessageReactionsResult = APIUser[];

export type RestPutAPIChannelMessageReactionResult = never;
export type RestDeleteAPIChannelMessageReactionResult = never;
export type RestDeleteAPIChannelAllMessageReactionsResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#bulk-delete-messages
 */
export interface RestPostAPIChannelMessagesBulkDeleteJSONBody {
	messages: string[];
}

export type RestPostAPIChannelMessagesBulkDeleteResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#edit-channel-permissions
 */
export interface RestPutAPIChannelPermissionsJSONBody {
	allow: number | string;
	deny: number | string;
	type: OverwriteType;
}

export type RestPutAPIChannelPermissionsResult = never;
export type RestDeleteAPIChannelPermissionsResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#get-channel-invites
 */
export type RestGetAPIChannelInvitesResult = APIInvite[];

export interface RestPostAPIChannelInviteJSONBody {
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
export type RestPostAPIChannelTypingResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#get-pinned-messages
 */
export type RestGetAPIChannelPinsResult = APIMessage[];

/**
 * https://discord.com/developers/docs/resources/channel#add-pinned-channel-message
 */
export type RestPutAPIChannelPinResult = never;
export type RestDeleteAPIChannelPinResult = never;

/**
 * https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
 */
export interface RestPutAPIChannelRecipientJSONBody {
	access_token: string;
	nick?: string;
}

export type RestPutAPIChannelRecipientResult = unknown;
export type RestDeleteAPIChannelRecipientResult = unknown;

// TODO: Docs updated once https://github.com/discord/discord-api-docs/pull/1692/files is merged

export type RestPostAPIChannelMessageCrosspostResult = APIMessage;

export interface RestPostAPIChannelFollowersJSONBody {
	webhook_channel_id: string;
}

export type RestPostAPIChannelFollowersResult = APIFollowedChannel;
