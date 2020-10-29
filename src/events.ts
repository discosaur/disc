
interface Listener<EventNames>
{
	eventName: EventNames
	callback: Callback
}

// deno-lint-ignore no-explicit-any
type Callback = (...args: any[]) => unknown;

/**
 * A very basic EventEmitter implementation supporting event typing + the on and emit methods
 */
export default class EventVenter<EventNames, EmitData>
{
	public listeners: Listener<EventNames>[] = []

	public on(eventName: EventNames, callback: Callback)
	{
		this.listeners.push({ eventName, callback });
		return this;
	}

	public emit(eventName: EventNames, data?: EmitData)
	{
		this.listeners
			.filter(listener => listener.eventName == eventName)
			.forEach(listener => listener.callback(data))
	}
}
