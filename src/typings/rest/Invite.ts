import type { APIInvite } from "../mod.ts";

/**
 * https://discord.com/developers/docs/resources/invite#get-invite
 */
export interface GetAPIInviteQuery {
	with_counts?: boolean;
}

export type GetAPIInviteResult = APIInvite;

/**
 * https://discord.com/developers/docs/resources/invite#delete-invite
 */
export type DeleteAPIInviteResult = APIInvite;
