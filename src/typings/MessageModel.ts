
export interface ICreateMessage
{
	content: string
	nonce: number | string
	tts: boolean
	file: unknown
	embed: unknown
	payload_json: string
	allowed_mentions: unknown
}
