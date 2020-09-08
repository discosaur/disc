import { Snowflake } from "../mod.ts";

export interface AttachmentRes
{
	url: string
	size: number
	proxy_url: string
	id: Snowflake
	filename: string
}