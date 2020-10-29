
// the only headers required to manage ratelimits
export interface RateLimitHeaders
{
	"x-ratelimit-remaining": string | null
	"x-ratelimit-reset-after": string | null
}

export interface ParsedHeaders
{
	remaining: number
	reset_after: number
}

export interface RestError
{
	error: {
		message: string
		code: number
	} | undefined
}

export type RestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
