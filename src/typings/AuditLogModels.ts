
interface IAuditLog
{
	webhooks: unknown[],
	users: unknown[],
	audit_log_entries: IAuditLogEntry[],
	integrations: unknown[]
}

interface IAuditLogEntry
{
	target_id?: string,
	changes?: IAuditLogChange[],
	user_id: string,
	id: string,
	action_type: AuditLogEventTypes,
	options?: IOptionalAuditLogEntryInfo,
	reason?: string
}

interface IAuditLogChange
{
	// https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key
	// deno-lint-ignore no-explicit-any
	new_value?: any,
	// deno-lint-ignore no-explicit-any
	old_value?: any,
	key: string
}

interface IOptionalAuditLogEntryInfo
{
	// MEMBER_PRUNE
	delete_member_days?: string,
	// MEMBER_PRUNE
	members_removed?: string,
	// MEMBER_MOVE & MESSAGE_PIN & MESSAGE_UNPIN & MESSAGE_DELETE
	channel_id?: string,
	// MESSAGE_PIN & MESSAGE_UNPIN
	message_id?: string,
	// MESSAGE_DELETE & MESSAGE_BULK_DELETE & MEMBER_DISCONNECT & MEMBER_MOVE
	count?: string,
	// CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE
	id?: string,
	// CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE
	type?: string,
	// CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE
	role_name?: string
}

interface IGetAuditLogOptions
{
	user_id?: string,
	action_type?: AuditLogEventTypes,
	before: string,
	limit: number
}

enum AuditLogEventTypes
{
	GUILD_UPDATE = 1,
	CHANNEL_CREATE = 10,
	CHANNEL_UPDATE = 11,
	CHANNEL_DELETE = 12,
	CHANNEL_OVERWRITE_CREATE = 13,
	CHANNEL_OVERWRITE_UPDATE = 14,
	CHANNEL_OVERWRITE_DELETE = 15,
	MEMBER_KICK = 20,
	MEMBER_PRUNE = 21,
	MEMBER_BAN_ADD = 22,
	MEMBER_BAN_REMOVE = 23,
	MEMBER_UPDATE = 24,
	MEMBER_ROLE_UPDATE = 25,
	MEMBER_MOVE = 26,
	MEMBER_DISCONNECT = 27,
	BOT_ADD = 28,
	ROLE_CREATE = 30,
	ROLE_UPDATE = 31,
	ROLE_DELETE = 32,
	INVITE_CREATE = 40,
	INVITE_UPDATE = 41,
	INVITE_DELETE = 42,
	WEBHOOK_CREATE = 50,
	WEBHOOK_UPDATE = 51,
	WEBHOOK_DELETE = 52,
	EMOJI_CREATE = 60,
	EMOJI_UPDATE = 61,
	EMOJI_DELETE = 62,
	MESSAGE_DELETE = 72,
	MESSAGE_BULK_DELETE = 73,
	MESSAGE_PIN = 74,
	MESSAGE_UNPIN = 75,
	INTEGRATION_CREATE = 80,
	INTEGRATION_UPDATE = 81,
	INTEGRATION_DELETE = 82
}

export
{
	IAuditLog,
	IAuditLogEntry,
	IAuditLogChange,
	IOptionalAuditLogEntryInfo,
	IGetAuditLogOptions,
	AuditLogEventTypes
}
