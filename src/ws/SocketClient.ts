import {
	platform,
	AGENT,
	connectWebSocket,
	isWebSocketCloseEvent,
	WebSocket,
	red, green
} from "../../deps.ts";

import { SocketEvent, SocketData, SocketHello } from "./mod.ts";
import { SomeObject, TypedEmitter } from "../typings/mod.ts";
import { RestClient } from "../../mod.ts";

export class SocketClient extends TypedEmitter<SocketEvent, SomeObject>
{
	private socket?: WebSocket;
	public lastSequence: number | null = null;
	public sessionId?: string;
	private heartbeatInterval?: number;
	private heartbeatAcknowledged = true;

	constructor(public rest: RestClient)
	{
		super();
		this.setup();
	}

	private async setup(resuming?: boolean)
	{
		const { url } = await this.rest.get<{ url: string }>("gateway/bot");

		if (!url)
			throw new Error("Could not fetch websocket endpoint");

		clearInterval(this.heartbeatInterval);

		try
		{
			console.log(green("Trying to connect to socket"));
			this.socket = await connectWebSocket(url + "?v=6&encoding=json");

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
					{
						console.log(red(`closed: code=${msg.code}, reason=${msg.reason}, reconnecting`));
						this.setup();
					}
				}
			}
			console.log(green("Connected to socket!"));

			this.authenticate();

			if (resuming)
			{
				console.log(green("Trying to resume session"));
				this.resume();
			}

			messages().catch(console.error);
		}
		catch (err)
		{
			console.error(red(`Could not connect to WebSocket: "${err}"`));
		}
	}

	private resume()
	{
		this.send(6, {
			token: this.rest.token,
			session_id: this.sessionId,
			seq: this.lastSequence
		});
	}

	public send(opcode: number, data: any)
	{
		if (this.socket?.isClosed)
			return;
		this.socket?.send(JSON.stringify({
			op: opcode,
			d: data
		}));
	}

	private authenticate()
	{
		console.log(green("Authenticating..."));
		this.send(2, {
			token: this.rest.token,
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
				this.emit(data.t, data.d);
				break;

			// Invalidation
			case 9:
				clearInterval(this.heartbeatInterval);
				if (!this.socket?.isClosed)
							this.socket?.close();
				if (data.d)
					this.setup(true);
				else
					this.setup();
				break;

			// Heartbeat request
			case 10:
				clearInterval(this.heartbeatInterval)
				const ms = (data.d as SocketHello).heartbeat_interval;
				this.heartbeatInterval = setInterval(() =>
				{
					if (!this.heartbeatAcknowledged)
					{
						if (!this.socket?.isClosed)
							this.socket?.close();
						console.log(red("No heartbeat Ack received by the discord gateway, reconnecting..."));
						this.setup();
					}
					this.heartbeatAcknowledged = false;
					this.send(1, this.lastSequence)
				}, ms);
				break;

			// Heartbeat Acknowledgement
			case 11:
				this.heartbeatAcknowledged = true;
				break;
		}
	}
}