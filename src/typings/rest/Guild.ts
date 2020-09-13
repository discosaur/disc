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
export interface RestPostAPIGuildsJSONBody {
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

export type RestPostAPIGuildsResult = APIGuild;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild
 */
export interface RestGetAPIGuildQuery {
	with_counts?: boolean;
}

export type RestGetAPIGuildResult = APIGuild;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-preview
 */
export type RestGetAPIGuildPreviewResult = APIGuildPreview;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild
 */
export interface RestPatchAPIGuildJSONBody {
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

export type RestPatchAPIGuildResult = APIGuild;

/**
 * https://discord.com/developers/docs/resources/guild#delete-guild
 */
export type RestDeleteAPIGuildResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-channels
 */
export type RestGetAPIGuildChannelsResult = APIChannel[];

/**
 * https://discord.com/developers/docs/resources/guild#create-guild-channel
 */
export type RestPostAPIGuildChannelJSONBody = APIGuildCreatePartialChannel;

export type RestPostAPIGuildChannelResult = APIChannel;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions
 */
export type RestPatchAPIGuildChannelPositionsJSONBody = Array<{
	id: string;
	position: number;
	lock_permissions?: boolean;
	parent_id?: string | null;
}>;

export type RestPatchAPIGuildChannelPositionsResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-member
 */
export type RestGetAPIGuildMemberResult = APIGuildMember;

/**
 * https://discord.com/developers/docs/resources/guild#list-guild-members
 */
export interface RestGetAPIGuildMembersQuery {
	limit?: number;
	after?: string;
}

export type RestGetAPIGuildMembersResult = APIGuildMember[];

export interface RestGetAPIGuildMembersSearchQuery {
	query: string;
	limit?: number;
}

export type RestGetAPIGuildMembersSearchResult = APIGuildMember[];

/**
 * https://discord.com/developers/docs/resources/guild#add-guild-member
 */
export interface RestPutAPIGuildMemberJSONBody {
	access_token: string;
	nick?: string;
	roles?: string[];
	mute?: boolean;
	deaf?: boolean;
}

export type RestPutAPIGuildMemberResult = APIGuildMember | undefined;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-member
 */
export interface RestPatchAPIGuildMemberJSONBody {
	nick?: string | null;
	roles?: string[] | null;
	mute?: boolean | null;
	deaf?: boolean | null;
	channel_id?: string | null;
}

export type RestPatchAPIGuildMemberResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#modify-current-user-nick
 */
export interface RestPatchAPICurrentGuildMemberNicknameJSONBody {
	nick?: string | null;
}

export type RestPatchAPICurrentGuildMemberNicknameResult = Required<RestPatchAPICurrentGuildMemberNicknameJSONBody>;

/**
 * https://discord.com/developers/docs/resources/guild#add-guild-member-role
 */
export type RestPutAPIGuildMemberRoleResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#remove-guild-member-role
 */
export type RestDeleteAPIGuildMemberRoleResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#remove-guild-member
 */
export type RestDeleteAPIGuildMemberResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-bans
 */
export type RestGetAPIGuildBansResult = APIBan[];

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-ban
 */
export type RestGetAPIGuildBanResult = APIBan;

/**
 * https://discord.com/developers/docs/resources/guild#create-guild-ban
 */
export interface RestPutAPIGuildBanJSONBody {
	delete_message_days?: number;
	reason?: string;
}

export type RestPutAPIGuildBanResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#remove-guild-ban
 */
export type RestDeleteAPIGuildBanResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-roles
 */
export type RestGetAPIGuildRolesResult = APIRole[];

/**
 * https://discord.com/developers/docs/resources/guild#create-guild-role
 */
export interface RestPostAPIGuildRoleJSONBody {
	name?: string | null;
	permissions?: number | string | null;
	color?: number | null;
	hoist?: boolean | null;
	mentionable?: boolean | null;
}

export type RestPostAPIGuildRoleResult = APIRole;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
 */
export type RestPatchAPIGuildRolePositionsJSONBody = Array<{
	id: string;
	position?: number;
}>;

export type RestPatchAPIGuildRolePositionsResult = APIRole[];

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-role
 */
export interface RestPatchAPIGuildRoleJSONBody {
	name?: string;
	permissions?: number | string;
	color?: number;
	hoist?: boolean;
	mentionable?: boolean;
}

export type RestPatchAPIGuildRoleResult = APIRole;

/**
 * https://discord.com/developers/docs/resources/guild#delete-guild-role
 */
export type RestDeleteAPIGuildRoleResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-prune-count
 */
export interface RestGetAPIGuildPruneCountQuery {
	days?: number;
	/**
	 * While this is typed as a string, it represents an array of
	 * role IDs delimited by commas.
	 *
	 * @see https://discord.com/developers/docs/resources/guild#get-guild-prune-count-query-string-params
	 */
	include_roles?: string;
}

export interface RestGetAPIGuildPruneCountResult {
	pruned: number;
}

/**
 * https://discord.com/developers/docs/resources/guild#begin-guild-prune
 */
export interface RestPostAPIGuildPruneJSONBody {
	days?: number;
	compute_prune_count?: boolean;
	include_roles?: string[];
}

export interface RestPostAPIGuildPruneResult {
	pruned: number | null;
}

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-voice-regions
 */
export type RestGetAPIGuildVoiceRegionsResult = APIVoiceRegion[];

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-invites
 */
export type RestGetAPIGuildInvitesResult = APIInvite[];

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-integrations
 */
export interface RestGetAPIGuildIntegrationsQuery {
	include_applications?: boolean;
}

export type RestGetAPIGuildIntegrationsResult = APIGuildIntegration[];

/**
 * https://discord.com/developers/docs/resources/guild#create-guild-integration
 */
export interface RestPostAPIGuildIntegrationJSONBody {
	type: string;
	id: string;
}

export type RestPostAPIGuildIntegrationResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-integration
 */
export interface RestPatchAPIGuildIntegrationJSONBody {
	expire_behavior?: IntegrationExpireBehavior | null;
	expire_grace_period?: number | null;
	enable_emoticons?: boolean | null;
}

export type RestPatchAPIGuildIntegrationResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#delete-guild-integration
 */
export type RestDeleteAPIGuildIntegrationResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#sync-guild-integration
 */
export type RestPostAPIGuildIntegrationSyncResult = never;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget
 */
export type RestGetAPIGuildWidgetResult = APIGuildWidget;

/**
 * https://discord.com/developers/docs/resources/guild#modify-guild-widget
 */
export type RestPatchAPIGuildWidgetJSONBody = Partial<APIGuildWidget>;

export type RestPatchAPIGuildWidgetResult = APIGuildWidget;

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-vanity-url
 */
export interface RestGetAPIGuildVanityUrlResult {
	code: string | null;
	uses: number;
}

/**
 * https://discord.com/developers/docs/resources/guild#get-guild-widget-image
 */
export interface RestGetAPIGuildWidgetImageQuery {
	style?: GuildWidgetStyle;
}

/**
 * Note: while the return type is `ArrayBuffer`, the expected result is
 * a buffer of sorts (depends if in browser or on node.js/deno).
 */
export type RestGetAPIGuildWidgetImageResult = ArrayBuffer;
