import { SocketEventsName, SomeObject } from "../typings/mod.ts";

export interface SocketData
{
	t: SocketEventsName,
	s: number,
	op: number,
	d: SomeObject
}

export interface DebugMessage
{
	message: string
}

export class SessionStore
{
	constructor(
		public acknowledged: boolean = false,
		public sequence: number | undefined = undefined,
		public id: string | null = null,
		public interval: number | undefined = undefined,
		public heartbeatTimestamp: number | undefined = undefined,
		public ping: number | undefined = undefined
	) { }
}