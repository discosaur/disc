export interface GuildModifyReq
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