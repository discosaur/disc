import { AuditLogEventTypes, Snowflake } from "../mod.ts";

export interface AuditLogOptionsReq
{
	user_id?: Snowflake,
	action_type?: AuditLogEventTypes,
	before: string,
	limit: number
}