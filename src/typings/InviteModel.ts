import { IUser } from "./UserModels.ts";

export interface IInvite
{
	code: string
	guild: unknown
	channel: unknown
	inviter?: IUser
	target_user?: unknown // partial user
	target_user_type?: TargetUserTypes
	approximate_presence_count?: number
	approximate_member_count?: number
}

enum TargetUserTypes
{
	"STREAM" = 1
}