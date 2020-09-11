import {
	WebSocket,
	connectWebSocket,
	isWebSocketCloseEvent,
	platform,
	red,
	green,
	AGENT
} from "../../deps.ts";

import { SocketEvent, SocketData, SessionStore, opcodes } from "./mod.ts";
import { SomeObject, TypedEmitter } from "../typings/mod.ts";
import { RestClient } from "../../mod.ts";

export class SocketClient extends TypedEmitter<SocketEvent, SomeObject>
{
	private socket?: WebSocket;
	private session = new SessionStore();

	constructor(public rest: RestClient)
	{
		super();
		this.setup();
	}

	public get ping(): number | undefined
	{
		return this.session.ping;
	}

	private async setup(resuming?: boolean)
	{
		const { url } = await this.rest.get<{ url: string }>("gateway/bot");

		if (!url)
			throw new Error("Could not fetch websocket endpoint");

		this.emit("DEBUG", { message: "Trying to connect to WebSocket..." });

		try
		{
			this.socket = await connectWebSocket(url + "?v=6&encoding=json");

			const messages = async (): Promise<void> =>
			{
				for await (const msg of this.socket!)
				{
					if (typeof msg === "string")
					{
						const json = JSON.parse(msg) as SocketData;

						if (typeof json.s === "number")
							this.session.sequence = json.s;

						this.switchOpCode(json);
					}

					else if (isWebSocketCloseEvent(msg))
						this.emit("DEBUG", { message: `WebSocket closed unexpectedly: code=${msg.code}, reasion=${msg.reason}` });
				}
			}

			this.emit("DEBUG", { message: "Connected to WebSocket" });

			this.identify();

			if (resuming)
				this.resume();

			messages().catch(console.error);
		}
		catch (err)
		{
			console.error(red(`Could not connect to WebSocket: "${err}"`));
		}
	}

	private resume()
	{
		this.emit("DEBUG", { message: "Trying to resume session after reconnecting" });
		this.send(opcodes.RESUME, {
			token: this.rest.token,
			session_id: this.session.id,
			seq: this.session.sequence
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

	private identify()
	{
		this.emit("DEBUG", { message: "Identifying with WebSocket connection..." });
		this.send(opcodes.IDENTIFY, {
			token: this.rest.token,
			properties: {
				$os: platform,
				$browser: AGENT,
				$device: AGENT
			}
		});
	}

	private heartbeat()
	{
		this.emit("DEBUG", { message: "Sending a heartbeat..." })
		this.session.heartbeatTimestamp = Date.now();
		this.send(opcodes.HEARTBEAT, this.session.sequence);
	}

	private updateSequence(s: number | undefined)
	{
		if (s != undefined)
			this.session.sequence = s;
	}

	private async close()
	{
		clearInterval(this.session.interval);
		if (!this.socket!.isClosed)
		{
			this.emit("DEBUG", { message: "Closing socket connection" })
			await this.socket!.close();
		}
	}

	private async switchOpCode(data: SocketData)
	{
		switch(data.op)
		{
			case opcodes.EVENT:
				this.emit("DEBUG", { message: `Received an event of type ${data.t}` });
				if (data.t == "READY")
					this.session.id = (data.d as { session_id: string }).session_id;
				this.updateSequence(data.s);
				this.emit(data.t, data.d);
				break;

			case opcodes.HEARTBEAT:
				this.emit("DEBUG", { message: "Received request for an arbitrary heartbeat" });
				this.heartbeat();
				break;

			case opcodes.RECONNECT:
				this.emit("DEBUG", { message: "Received request to reconnect..." });
				this.updateSequence(data.s);
				this.close();
				this.setup(true);
				break;

			case opcodes.INVALIDATED:
				this.emit("DEBUG", { message: "WebSocket connection invalidated" });
				this.emit("INVALIDATED", {});
				this.close();
				break;

			case opcodes.HELLO:
				this.emit("DEBUG", { message: "Received HELLO code 10 by WebSocket" });
				this.session.acknowledged = true;
				this.session.interval = setInterval(() =>
				{
					if (!this.session.acknowledged)
					{
						this.close();
						this.setup();
					}
					else
						this.heartbeat();
				}, (data.d as { heartbeat_interval: number }).heartbeat_interval);
				break;

			case opcodes.HEARTBEAT_ACK:
				this.session.acknowledged = true;
				this.session.ping = Date.now() - this.session.heartbeatTimestamp!;
				this.emit("DEBUG", { message: `Heartbeat acknowledged (ping: ${this.ping}ms)` });
				break;
		}
	}
}