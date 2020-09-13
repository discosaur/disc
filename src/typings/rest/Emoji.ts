import type { APIEmoji } from "../mod.ts";

/**
 * https://discord.com/developers/docs/resources/emoji#list-guild-emojis
 */
export type RestGetAPIGuildEmojisResult = APIEmoji[];

/**
 * https://discord.com/developers/docs/resources/emoji#get-guild-emoji
 */
export type RestGetAPIGuildEmojiResult = APIEmoji;

/**
 * https://discord.com/developers/docs/resources/emoji#create-guild-emoji-json-params
 */
export interface RestPostAPIGuildEmojiJSONBody {
	name: string;
	/**
	 * The image data, read more [here](https://discord.com/developers/docs/reference#image-data)
	 */
	image: string;
	roles?: string[];
}

export type RestPostAPIGuildEmojiResult = APIEmoji;

/**
 * https://discord.com/developers/docs/resources/emoji#modify-guild-emoji
 */
export interface RestPatchAPIGuildEmojiJSONBody {
	name?: string;
	roles?: string[] | null;
}

export type RestPatchAPIGuildEmojiResult = APIEmoji;

/**
 * https://discord.com/developers/docs/resources/emoji#delete-guild-emoji
 */
export type RestDeleteAPIGuildEmojiResult = never;
