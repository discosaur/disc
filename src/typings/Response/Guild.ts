import { IEmoji } from "../Emoji.ts";
import { Snowflake } from "../mod.ts";

// from get users/@me/guilds
interface SimpleGuildRes
{
	id: Snowflake,
	name: string,
	icon?: string,
	owner: boolean,
	permissions: number,
	permissions_new: string
}

// from get guilds/714930431065325609
export interface GuildRes /*extends SimpleGuildRes*/
{
	id: Snowflake, 
	name: string,
	description: string,
	icon?: string,
	splash: unknown | null,
	discovery_splash : unknown | null,
	features: string[],
	emojis: IEmoji[],
	banner: string | null,
	owner_id: string,
	application_id: string | null
	region: string,
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
	preferred_locale: string,
	rules_channel_id: string,
	public_updates_channel_id: string,
	embed_enabled: boolean,
	embed_channel_id: string
}

export { GuildRes as IGuild };
