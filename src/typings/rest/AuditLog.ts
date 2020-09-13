import type { APIAuditLog, AuditLogEvent } from "../mod.ts";

/**
 * https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
 */
export interface RestGetAPIAuditLogQuery {
	user_id?: string;
	action_type?: AuditLogEvent;
	before?: string;
	limit?: number;
}

export type RestGetAPIAuditLogResult = APIAuditLog;
