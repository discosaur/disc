export interface ConnectionRes
{
	id: string,
	name: string,
	type: string,
	revoked?: boolean,
	integrations?: unknown[],
	verified: boolean,
	friend_sync: boolean,
	show_activity: boolean,
	visibility: 0 | 1 | number
}
