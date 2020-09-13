import type { APIAllowedMentionsSend, APIEmbed, APIMessage, APIWebhook } from "../mod.ts";

/**
 * https://discord.com/developers/docs/resources/webhook#create-webhook
 */
export interface RestPostAPIChannelWebhookJSONBody {
	name: string;
	avatar?: string | null;
}

export type RestPostAPIChannelWebhookResult = APIWebhook;

/**
 * https://discord.com/developers/docs/resources/webhook#get-channel-webhooks
 */
export type RestGetAPIChannelWebhooksResult = APIWebhook[];

/**
 * https://discord.com/developers/docs/resources/webhook#get-guild-webhooks
 */
export type RestGetAPIGuildWebhooksResult = APIWebhook[];

/**
 * https://discord.com/developers/docs/resources/webhook#get-webhook
 */
export type RestGetAPIWebhookResult = APIWebhook;

/**
 * https://discord.com/developers/docs/resources/webhook#get-webhook-with-token
 */
export type RestGetAPIWebhookWithTokenResult = Omit<APIWebhook, "user">;

/**
 * https://discord.com/developers/docs/resources/webhook#modify-webhook
 */
export interface RestPatchAPIWebhookJSONBody {
	name?: string;
	avatar?: string | null;
	channel_id?: string;
}

export type RestPatchAPIWebhookResult = APIWebhook;

/**
 * https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token
 */
export type RestPatchAPIWebhookWithTokenJSONBody = Omit<RestPatchAPIWebhookJSONBody, "channel_id">;

export type RestPatchAPIWebhookWithTokenResult = Omit<APIWebhook, "user">;

/**
 * https://discord.com/developers/docs/resources/webhook#delete-webhook
 */
export type RestDeleteAPIWebhookResult = never;
export type RestDeleteAPIWebhookWithTokenResult = never;

/**
 * https://discord.com/developers/docs/resources/webhook#execute-webhook
 */
export interface RestPostAPIWebhookWithTokenJSONBody {
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
export type RestPostAPIWebhookWithTokenFormDataBody =
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
	| (RestPostAPIWebhookWithTokenJSONBody & {
			/**
			 * The file contents
			 */
			file: unknown;
	  });

/**
 * https://discord.com/developers/docs/resources/webhook#execute-webhook-querystring-params
 */
export interface RestPostAPIWebhookWithTokenQuery {
	wait?: boolean;
}

export type RestPostAPIWebhookWithTokenResult = never;

/**
 * Received when a call to POST `/webhooks/{webhook.id}/{webhook.token}` receives
 * the `wait` query parameter set to `true`
 *
 * @see https://discord.com/developers/docs/resources/webhook#execute-webhook-querystring-params
 */
export type RestPostAPIWebhookWithTokenWaitResult = APIMessage;

/**
 * https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook-querystring-params
 */
export type RestPostAPIWebhookWithTokenSlackQuery = RestPostAPIWebhookWithTokenQuery;

/**
 * https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook-querystring-params
 */
export type RestPostAPIWebhookWithTokenGitHubQuery = RestPostAPIWebhookWithTokenQuery;
