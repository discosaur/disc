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
	private session = new SessionStore(false, null, null, undefined);

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
							this.session.sequence = json.s;

						this.switchOpCode(json);
					}

					else if (isWebSocketCloseEvent(msg))
					{
						console.log(red(`closed: code=${msg.code}, reason=${msg.reason}, reconnecting`));
					}
				}
			}
			console.log(green("Connected to socket!"));

			this.identify();

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
		console.log(green("Identifying..."));
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
			await this.socket!.close();
	}

	private async switchOpCode(data: SocketData)
	{
		switch(data.op)
		{
			case opcodes.EVENT:
				if (data.t == "READY")
					this.session.id = (data.d as { session_id: string }).session_id;
				this.updateSequence(data.s);
				this.emit(data.t, data.d);
				break;

			case opcodes.HEARTBEAT:
				this.heartbeat();
				break;

			case opcodes.RECONNECT:
				this.updateSequence(data.s);
				this.close();
				this.setup(true);
				break;

			case opcodes.INVALIDATED:
				this.emit("INVALIDATED", {});
				this.close();
				break;

			case opcodes.HELLO:
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
				break;
		}
	}
}