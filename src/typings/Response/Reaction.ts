import { EmojiRes } from "./mod.ts";

export interface ReactionRes
{
	count: number
	me: boolean
	emoji: EmojiRes
}