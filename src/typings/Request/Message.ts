import { Embed } from "../Embed.ts";

export interface MessageReq
{
	content?: string
	nonce?: number | string
	tts?: boolean
	file?: unknown
	embed?: Embed
	payload_json?: string
	allowed_mentions?: unknown
}
