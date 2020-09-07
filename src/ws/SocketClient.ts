import {
	platform,
	AGENT,
	connectWebSocket,
	isWebSocketCloseEvent,
	WebSocket,
	red
} from "../../deps.ts";

import { DiscordStructure, SocketEvent, SocketData, SocketHello } from "./mod.ts";
import { SomeObject, TypedEmitter } from "../typings/mod.ts";

export class SocketClient extends TypedEmitter<SocketEvent, DiscordStructure>
{
	private socket?: WebSocket;
	public lastSequence: number | null = null;
	public sessionId?: string;
	private heartbeatInterval?: number;
	private heartbeatAcknowledged = true;

	constructor(private readonly token: string, public readonly gateway: string)
	{
		super();
		this.gateway += "?v=6&encoding=json";
		this.setup();
	}

	public send(opcode: number, data: SomeObject)
	{
		this.socket?.send(JSON.stringify({
			op: opcode,
			d: data
		}));
	}

	private async setup(resuming?: boolean)
	{
		try
		{
			this.socket = await connectWebSocket(this.gateway);

			const messages = async (): Promise<void> =>
			{
				for await (const msg of this.socket!)
				{
					if (typeof msg === "string")
					{
						const json = JSON.parse(msg) as SocketData;

						if (typeof json.s === "number")
							this.lastSequence = json.s;

						this.switchOpCode(json);
					}

					else if (isWebSocketCloseEvent(msg))
						console.log(red(`closed: code=${msg.code}, reason=${msg.reason}`));
				}
			}

			this.authenticate();

			if (resuming)
				this.resume();

			await Promise.race([messages()]).catch(console.error);

		}
		catch (err)
		{
			console.error(red(`Could not connect to WebSocket: "${err}"`));
		}
	}

	private resume()
	{
		this.send(6, {
			token: this.token,
			session_id: this.sessionId,
			seq: this.lastSequence
		});
	}

	private authenticate()
	{
		this.send(2, {
			token: this.token,
			properties: {
				$os: platform,
				$browser: AGENT,
				$device: AGENT
			}
		});
	}

	private async switchOpCode(data: SocketData)
	{
		switch(data.op)
		{
			// Data
			case 0:
				if ((data.d as { session_id?: string }).session_id)
					this.sessionId = (data.d as { session_id: string }).session_id;
				this.emit(data.t, data.d as DiscordStructure);
				break;

			// Invalidation
			case 9:
				if (data.d)
				{
					await this.socket?.close();
					this.setup(true);
				}
				else
					throw new Error("Unable to resume websocket connection");
				break;

			// Heartbeat request
			case 10:
				clearInterval(this.heartbeatInterval)
				const ms = (data.d as SocketHello).heartbeat_interval;
				this.heartbeatInterval = setInterval(async () =>
				{
					if (!this.heartbeatAcknowledged)
					{
						this.socket?.close();
						throw new Error(red("No hearbeat Ack received by the discord gateway"));
					}
					this.heartbeatAcknowledged = false;
					await this.socket?.send(JSON.stringify({ op: 1, d: this.lastSequence }));
				}, ms);
				break;

			// Heartbeat Acknowledgement
			case 11:
				this.heartbeatAcknowledged = true;
				break;
		}
	}
}
