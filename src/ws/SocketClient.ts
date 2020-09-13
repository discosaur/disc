import {
	WebSocket,
	connectWebSocket,
	isWebSocketCloseEvent,
	platform,
	AGENT
} from "../../deps.ts";

import { SocketData, SessionStore } from "./mod.ts";
import { SocketOPCodes, SocketDispatchEventsName } from "../typings/mod.ts";
import { SomeObject, TypedEmitter } from "../typings/mod.ts";
import { RestClient } from "../../mod.ts";

export class SocketClient extends TypedEmitter<SocketDispatchEventsName, SomeObject>
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
		const res = await this.rest.get<{ url: string }>("gateway/bot");

		if (res.error)
			throw new Error(`Error fetching gateway endpoint: ${res.error.message}, code: ${res.error.code}`);

		this.emit("DEBUG", { message: "Trying to connect to WebSocket..." });

		try
		{
			this.socket = await connectWebSocket(res.url + "?v=6&encoding=json");

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
			console.error(`Could not connect to WebSocket: "${err}"`);
		}
	}

	private resume()
	{
		this.emit("DEBUG", { message: "Trying to resume session after reconnecting" });
		this.send(SocketOPCodes.RESUME, {
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
		this.send(SocketOPCodes.IDENTIFY, {
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
		this.send(SocketOPCodes.HEARTBEAT, this.session.sequence);
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
			case SocketOPCodes.EVENT:
				this.emit("DEBUG", { message: `Received an event of type ${data.t}` });
				if (data.t == "READY")
					this.session.id = (data.d as { session_id: string }).session_id;
				this.updateSequence(data.s);
				this.emit(data.t, data.d);
				break;

			case SocketOPCodes.HEARTBEAT:
				this.emit("DEBUG", { message: "Received request for an arbitrary heartbeat" });
				this.heartbeat();
				break;

			case SocketOPCodes.RECONNECT:
				this.emit("DEBUG", { message: "Received request to reconnect..." });
				this.updateSequence(data.s);
				this.close();
				this.setup(true);
				break;

			case SocketOPCodes.INVALIDATED:
				this.emit("DEBUG", { message: "WebSocket connection invalidated" });
				this.emit("INVALIDATED", {});
				this.close();
				break;

			case SocketOPCodes.HELLO:
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
					{
						this.heartbeat();
						this.session.acknowledged = false;
					}
				}, (data.d as { heartbeat_interval: number }).heartbeat_interval);
				break;

			case SocketOPCodes.HEARTBEAT_ACK:
				this.session.acknowledged = true;
				this.session.ping = Date.now() - this.session.heartbeatTimestamp!;
				this.emit("DEBUG", { message: `Heartbeat acknowledged (ping: ${this.ping}ms)` });
				break;
		}
	}
}