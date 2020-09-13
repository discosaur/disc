import type { APIAllowedMentionsSend, APIEmbed, APIMessage, APIWebhook } from "../mod.ts";

/**
 * https://discord.com/developers/docs/resources/webhook#create-webhook
 */
export interface PostAPIChannelWebhookJSONBody {
	name: string;
	avatar?: string | null;
}

export type PostAPIChannelWebhookResult = APIWebhook;

/**
 * https://discord.com/developers/docs/resources/webhook#get-channel-webhooks
 */
export type GetAPIChannelWebhooksResult = APIWebhook[];

/**
 * https://discord.com/developers/docs/resources/webhook#get-guild-webhooks
 */
export type GetAPIGuildWebhooksResult = APIWebhook[];

/**
 * https://discord.com/developers/docs/resources/webhook#get-webhook
 */
export type GetAPIWebhookResult = APIWebhook;

/**
 * https://discord.com/developers/docs/resources/webhook#get-webhook-with-token
 */
export type GetAPIWebhookWithTokenResult = Omit<APIWebhook, "user">;

/**
 * https://discord.com/developers/docs/resources/webhook#modify-webhook
 */
export interface PatchAPIWebhookJSONBody {
	name?: string;
	avatar?: string | null;
	channel_id?: string;
}

export type PatchAPIWebhookResult = APIWebhook;

/**
 * https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token
 */
export type PatchAPIWebhookWithTokenJSONBody = Omit<PatchAPIWebhookJSONBody, "channel_id">;

export type PatchAPIWebhookWithTokenResult = Omit<APIWebhook, "user">;

/**
 * https://discord.com/developers/docs/resources/webhook#delete-webhook
 */
export type DeleteAPIWebhookResult = never;
export type DeleteAPIWebhookWithTokenResult = never;

/**
 * https://discord.com/developers/docs/resources/webhook#execute-webhook
 */
export interface PostAPIWebhookWithTokenJSONBody {
	content?: string;
	username?: string;
	avatar_url?: string;
	tts?: boolean;
	embeds?: APIEmbed[];
	allowed_mentions?: APIAllowedMentionsSend;
}

/**
 * https://discord.com/developers/docs/resources/webhook#execute-webhook
 */
export type PostAPIWebhookWithTokenFormDataBody =
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
	| (PostAPIWebhookWithTokenJSONBody & {
			/**
			 * The file contents
			 */
			file: unknown;
	  });

/**
 * https://discord.com/developers/docs/resources/webhook#execute-webhook-querystring-params
 */
export interface PostAPIWebhookWithTokenQuery {
	wait?: boolean;
}

export type PostAPIWebhookWithTokenResult = never;

/**
 * Received when a call to POST `/webhooks/{webhook.id}/{webhook.token}` receives
 * the `wait` query parameter set to `true`
 *
 * @see https://discord.com/developers/docs/resources/webhook#execute-webhook-querystring-params
 */
export type PostAPIWebhookWithTokenWaitResult = APIMessage;

/**
 * https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook-querystring-params
 */
export type PostAPIWebhookWithTokenSlackQuery = PostAPIWebhookWithTokenQuery;

/**
 * https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook-querystring-params
 */
export type PostAPIWebhookWithTokenGitHubQuery = PostAPIWebhookWithTokenQuery;