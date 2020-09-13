import type { APIEmoji } from "../mod.ts";

/**
 * https://discord.com/developers/docs/resources/emoji#list-guild-emojis
 */
export type GetAPIGuildEmojisResult = APIEmoji[];

/**
 * https://discord.com/developers/docs/resources/emoji#get-guild-emoji
 */
export type GetAPIGuildEmojiResult = APIEmoji;

/**
 * https://discord.com/developers/docs/resources/emoji#create-guild-emoji-json-params
 */
export interface PostAPIGuildEmojiJSONBody {
	name: string;
	/**
	 * The image data, read more [here](https://discord.com/developers/docs/reference#image-data)
	 */
	image: string;
	roles?: string[];
}

export type PostAPIGuildEmojiResult = APIEmoji;

/**
 * https://discord.com/developers/docs/resources/emoji#modify-guild-emoji
 */
export interface PatchAPIGuildEmojiJSONBody {
	name?: string;
	roles?: string[] | null;
}

export type PatchAPIGuildEmojiResult = APIEmoji;

/**
 * https://discord.com/developers/docs/resources/emoji#delete-guild-emoji
 */
export type DeleteAPIGuildEmojiResult = never;
