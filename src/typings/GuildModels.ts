// from get users/@me/guilds
interface IBaseGuildMe
{
	id: string,
	name: string,
	icon?: string,
	owner: boolean,
	permissions: number,
	// features: string[],
	permissions_new: string
}

// from get guilds/714930431065325609
interface IGetGuild
{
	id: string,
	name: string,
	description: string,
	splash: unknown | null,
	discovery_splash : unknown | null,
	features: string[],
	emojis: {
		name: string,
		roles: unknown[],
		id: string,
		require_colons: boolean,
		managed: boolean,
		animated: boolean,
		available: boolean
	}[],
	banner: unknown | null,
	owner_id: string,
	application_id: unknown | null
	region: unknown,
	afk_channel_id: string | null,
	afk_timeout: number,
	system_channel_id: string,
	widget_enabled: boolean
	widget_channel_id: string,
	verification_level: number
	roles: {
		id: string,
		name: string,
		permissions: number,
		position: number,
		color: number,
		hoist: boolean,
		managed: boolean,
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
	preferred_locale: unknown,
	rules_channel_id: string,
	public_updates_channel_id: string,
	embed_enabled: boolean,
	embed_channel_id: string
}

interface IGuildModify
{
	name?: string,
	region?: string,
	verification_level?: number,
	default_message_notifications?: number,
	explicit_content_filter?: number,
	afk_channel_id?: string,
	afk_timeout?: number,
	icon?: unknown,
	owner_id?: string,
	splash?: unknown,
	banner?: unknown,
	system_channel_id?: string,
	rules_channel_id?: string,
	public_updates_channel_id?: string,
	preferred_locale?: string
}

export { IBaseGuildMe, IGetGuild, IGuildModify };