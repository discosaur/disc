import { EventEmitter } from "https://deno.land/std@0.68.0/node/events.ts";
import { red, yellow, green } from "https://deno.land/std@0.68.0/fmt/colors.ts";
import { platform } from "https://deno.land/std@0.68.0/node/process.ts";
import { validateIntegerRange } from "https://deno.land/std@0.68.0/node/_utils.ts";
import { assert } from "https://deno.land/std@0.68.0/_util/assert.ts";
import {
	connectWebSocket,
	isWebSocketCloseEvent,
	isWebSocketPingEvent,
	isWebSocketPongEvent,
	WebSocket
} from "https://deno.land/std@0.68.0/ws/mod.ts";

export
{
	EventEmitter,
	WebSocket,
	connectWebSocket,
	isWebSocketCloseEvent,
	isWebSocketPingEvent,
	isWebSocketPongEvent,
	red,
	yellow,
	green,
	platform,
	validateIntegerRange,
	assert
};

export const clientAgentString = "disc (0.1.0)";