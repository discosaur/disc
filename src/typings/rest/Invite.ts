import type { APIInvite } from "../mod.ts";

/**
 * https://discord.com/developers/docs/resources/invite#get-invite
 */
export interface RestGetAPIInviteQuery {
	with_counts?: boolean;
}

export type RestGetAPIInviteResult = APIInvite;

/**
 * https://discord.com/developers/docs/resources/invite#delete-invite
 */
export type RestDeleteAPIInviteResult = APIInvite;
