import { GATEWAY_URL, AGENT } from "./constants.ts";
import { FullGatewayEmit, DispatchedEvent, OPCodes, Presence } from "./types.ts";
import EventVenter from "./events.ts";

export class Gateway extends EventVenter<DispatchedEvent, FullGatewayEmit>
{
	private socket?: WebSocket
	private sequence = 0
	private sessionId?: string
	private acknowledged = true
	private interval?: number
	private intents = 0

	constructor(private token: string, intents: number[], public presence: Presence)
	{
		super();
		intents.forEach(val => this.intents += val);
		this.connect();
	}

	private connect(resuming?: boolean)
	{
		const socket = new WebSocket(GATEWAY_URL);
		socket.onopen = () => this.onopen(resuming);
		socket.onmessage = (message) => this.onmessage(message);
		socket.onclose = console.error;
		socket.onerror = console.error;
		this.socket = socket;
	}

	// deno-lint-ignore no-explicit-any
	public send(opcode: OPCodes, data: any)
	{
		this.socket!.send(JSON.stringify({
			op: opcode,
			d: data
		}));
	}

	private identify()
	{
		this.send(OPCodes.IDENTIFY, {
			token: this.token,
			intents: this.intents,
			presence: this.presence,
			properties: {
				$browser: AGENT,
				$device: AGENT
			}
		});
	}

	private resume()
	{
		this.send(OPCodes.RESUME, {
			token: this.token,
			session_id: this.sessionId,
			seq: this.sequence
		});
	}

	private heartbeat()
	{
		this.send(OPCodes.HEARTBEAT, this.sequence);
	}

	private updateSequence(seq: number | undefined)
	{
		if (typeof seq == "number")
			this.sequence = seq;
	}

	public close()
	{
		clearInterval(this.interval);
		this.socket!.close();
	}

	private onopen(resuming?: boolean)
	{
		this.identify();
		if (resuming)
			this.resume();
		this.send(OPCodes.PRESENCE_UPDATE, this.presence);
	}

	private onmessage(message: MessageEvent)
	{
		const data = JSON.parse(message.data) as FullGatewayEmit;
		this.updateSequence(data.s);
		switch (data.op)
		{
			case OPCodes.EVENT:
				if (data.t == DispatchedEvent.Ready)
					this.sessionId = data.d.session_id;
				this.emit(data.t as DispatchedEvent, data.d);
				break;

			case OPCodes.HELLO:
				this.acknowledged = true;
				this.interval = setInterval(() =>
				{
					if (!this.acknowledged)
					{
						this.close();
						this.connect();
					}
					else
					{
						this.heartbeat();
						this.acknowledged = false;
					}
				}, data.d.heartbeat_interval)
				break;

			case OPCodes.HEARTBEAT_ACK:
				this.acknowledged = true;
				break;

			case OPCodes.HEARTBEAT:
				this.heartbeat();
				break;

			case OPCodes.RECONNECT:
				this.updateSequence(data.s);
				this.close();
				this.connect();
				break;

			case OPCodes.INVALIDATED:
				this.close();
				break;
		}
	}
}
