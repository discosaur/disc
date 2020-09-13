import type {
	APIBan,
	APIChannel,
	APIGuild,
	APIGuildIntegration,
	APIGuildMember,
	APIGuildPreview,
	APIGuildWidget,
	APIInvite,
	APIRole,
	APIVoiceRegion,
	GuildDefaultMessageNotifications,
	GuildExplicitContentFilter,
	GuildFeature,
	GuildVerificationLevel,
	GuildWidgetStyle,
	IntegrationExpireBehavior,
} from "../mod.ts";

export type APIGuildCreatePartialChannel = Partial<
	Pick<
		APIChannel,
		"type" | "permission_overwrites" | "topic" | "nsfw" | "bitrate" | "user_limit" | "rate_limit_per_user" | "parent_id"
	>
> &
	Required<Pick<APIChannel, "name">>;

/**
 * https://discord.com/developers/docs/resources/guild#create-guild
 */
export interface PostAPIGuildsJSONBody {
	name: string;
	region?: string;
	icon?: string;
	verification_level?: GuildVerificationLevel;
	default_message_notifications?: GuildDefaultMessageNotifications;
	explicit_content_filter?: GuildExplicitContentFilter;
	roles?: APIRole[];
	channels?: APIGuildCreatePartialChannel[];
	afk_channel_id?: string;
	afk_timeout?: number;
	system_channel_id?: string;
}

export type PostAPIGuildsResult = APIGuild;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild
 */
export interface GetAPIGuildQuery {
	with_counts?: boolean;
}

export type GetAPIGuildResult = APIGuild;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-preview
 */
export type GetAPIGuildPreviewResult = APIGuildPreview;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild
 */
export interface PatchAPIGuildJSONBody {
	name?: string;
	region?: string;
	verification_level?: GuildVerificationLevel;
	default_message_notifications?: GuildDefaultMessageNotifications;
	explicit_content_filter?: GuildExplicitContentFilter;
	afk_channel_id?: string | null;
	afk_timeout?: number;
	icon?: string | null;
	owner_id?: string;
	splash?: string | null;
	discovery_splash?: string | null;
	banner?: string | null;
	system_channel_id?: string | null;
	rules_channel_id?: string | null;
	public_updates_channel_id?: string | null;
	preferred_locale?: string;
	features?: GuildFeature[];
	description?: string | null;
}

export type PatchAPIGuildResult = APIGuild;

/**
 * https://discord.com/developers/docs/resources/guild#delete-guild
 */
export type DeleteAPIGuildResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-channels
 */
export type GetAPIGuildChannelsResult = APIChannel[];

/**
 * https://discord.com/developers/docs/resources/guild#create-guild-channel
 */
export type PostAPIGuildChannelJSONBody = APIGuildCreatePartialChannel;

export type PostAPIGuildChannelResult = APIChannel;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions
 */
export type PatchAPIGuildChannelPositionsJSONBody = Array<{
	id: string;
	position: number;
	lock_permissions?: boolean;
	parent_id?: string | null;
}>;

export type PatchAPIGuildChannelPositionsResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-member
 */
export type GetAPIGuildMemberResult = APIGuildMember;

/**
 * https://discord.com/developers/docs/resources/guild#list-guild-members
 */
export interface GetAPIGuildMembersQuery {
	limit?: number;
	after?: string;
}

export type GetAPIGuildMembersResult = APIGuildMember[];

export interface GetAPIGuildMembersSearchQuery {
	query: string;
	limit?: number;
}

export type GetAPIGuildMembersSearchResult = APIGuildMember[];

/**
 * https://discord.com/developers/docs/resources/guild#add-guild-member
 */
export interface PutAPIGuildMemberJSONBody {
	access_token: string;
	nick?: string;
	roles?: string[];
	mute?: boolean;
	deaf?: boolean;
}

export type PutAPIGuildMemberResult = APIGuildMember | undefined;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-member
 */
export interface PatchAPIGuildMemberJSONBody {
	nick?: string | null;
	roles?: string[] | null;
	mute?: boolean | null;
	deaf?: boolean | null;
	channel_id?: string | null;
}

export type PatchAPIGuildMemberResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#modify-current-user-nick
 */
export interface PatchAPICurrentGuildMemberNicknameJSONBody {
	nick?: string | null;
}

export type PatchAPICurrentGuildMemberNicknameResult = Required<PatchAPICurrentGuildMemberNicknameJSONBody>;

/**
 * https://discord.com/developers/docs/resources/guild#add-guild-member-role
 */
export type PutAPIGuildMemberRoleResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#remove-guild-member-role
 */
export type DeleteAPIGuildMemberRoleResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#remove-guild-member
 */
export type DeleteAPIGuildMemberResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-bans
 */
export type GetAPIGuildBansResult = APIBan[];

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-ban
 */
export type GetAPIGuildBanResult = APIBan;

/**
 * https://discord.com/developers/docs/resources/guild#create-guild-ban
 */
export interface PutAPIGuildBanJSONBody {
	delete_message_days?: number;
	reason?: string;
}

export type PutAPIGuildBanResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#remove-guild-ban
 */
export type DeleteAPIGuildBanResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-roles
 */
export type GetAPIGuildRolesResult = APIRole[];

/**
 * https://discord.com/developers/docs/resources/guild#create-guild-role
 */
export interface PostAPIGuildRoleJSONBody {
	name?: string | null;
	permissions?: number | string | null;
	color?: number | null;
	hoist?: boolean | null;
	mentionable?: boolean | null;
}

export type PostAPIGuildRoleResult = APIRole;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
 */
export type PatchAPIGuildRolePositionsJSONBody = Array<{
	id: string;
	position?: number;
}>;

export type PatchAPIGuildRolePositionsResult = APIRole[];

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-role
 */
export interface PatchAPIGuildRoleJSONBody {
	name?: string;
	permissions?: number | string;
	color?: number;
	hoist?: boolean;
	mentionable?: boolean;
}

export type PatchAPIGuildRoleResult = APIRole;

/**
 * https://discord.com/developers/docs/resources/guild#delete-guild-role
 */
export type DeleteAPIGuildRoleResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-prune-count
 */
export interface GetAPIGuildPruneCountQuery {
	days?: number;
	/**
	 * While this is typed as a string, it represents an array of
	 * role IDs delimited by commas.
	 *
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-prune-count-query-string-params
	 */
	include_roles?: string;
}

export interface GetAPIGuildPruneCountResult {
	pruned: number;
}

/**
 * https://discord.com/developers/docs/resources/guild#begin-guild-prune
 */
export interface PostAPIGuildPruneJSONBody {
	days?: number;
	compute_prune_count?: boolean;
	include_roles?: string[];
}

export interface PostAPIGuildPruneResult {
	pruned: number | null;
}

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-voice-regions
 */
export type GetAPIGuildVoiceRegionsResult = APIVoiceRegion[];

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-invites
 */
export type GetAPIGuildInvitesResult = APIInvite[];

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-integrations
 */
export interface GetAPIGuildIntegrationsQuery {
	include_applications?: boolean;
}

export type GetAPIGuildIntegrationsResult = APIGuildIntegration[];

/**
 * https://discord.com/developers/docs/resources/guild#create-guild-integration
 */
export interface PostAPIGuildIntegrationJSONBody {
	type: string;
	id: string;
}

export type PostAPIGuildIntegrationResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-integration
 */
export interface PatchAPIGuildIntegrationJSONBody {
	expire_behavior?: IntegrationExpireBehavior | null;
	expire_grace_period?: number | null;
	enable_emoticons?: boolean | null;
}

export type PatchAPIGuildIntegrationResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#delete-guild-integration
 */
export type DeleteAPIGuildIntegrationResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#sync-guild-integration
 */
export type PostAPIGuildIntegrationSyncResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget
 */
export type GetAPIGuildWidgetResult = APIGuildWidget;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-widget
 */
export type PatchAPIGuildWidgetJSONBody = Partial<APIGuildWidget>;

export type PatchAPIGuildWidgetResult = APIGuildWidget;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-vanity-url
 */
export interface GetAPIGuildVanityUrlResult {
	code: string | null;
	uses: number;
}

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget-image
 */
export interface GetAPIGuildWidgetImageQuery {
	style?: GuildWidgetStyle;
}

/**
 * Note: while the return type is `ArrayBuffer`, the expected result is
 * a buffer of sorts (depends if in browser or on node.js/deno).
 */
export type GetAPIGuildWidgetImageResult = ArrayBuffer;