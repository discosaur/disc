import { IEmoji } from "../mod.ts";

export interface ReactionRes
{
	count: number
	me: boolean
	emoji: IEmoji
}