import { validateIntegerRange, assert } from "../../deps.ts";
export type GenericFunction = (...args: any[]) => any;

export interface WrappedFunction extends Function {
	listener: GenericFunction;
}
/**
 * See also https://nodejs.org/api/events.html
 */
export default class TypedEmitter<E extends string | symbol, D>
{
	public static defaultMaxListeners = 10;
	public static errorMonitor = Symbol("events.errorMonitor");
	private maxListeners: number | undefined;
	private _events: Map<E, Array<GenericFunction | WrappedFunction>>;

	constructor()
	{
		this._events = new Map();
	}

	private _addListener(
		eventName: E,
		listener: GenericFunction | WrappedFunction,
		prepend: boolean,
	): this
	{
		if (this._events.has(eventName))
		{
			const listeners = this._events.get(eventName) as Array<GenericFunction | WrappedFunction>;
			if (prepend)
				listeners.unshift(listener);
			else
				listeners.push(listener);
		}
		else
			this._events.set(eventName, [listener]);

		const max = this.getMaxListeners();
		if (max > 0 && this.listenerCount(eventName) > max)
		{
			const warning = new Error(
				`Possible TypedEmitter memory leak detected.
				${this.listenerCount(eventName)} ${eventName.toString()} listeners.
				Use emitter.setMaxListeners() to increase limit`,
			);
			warning.name = "MaxListenersExceededWarning";
			console.warn(warning);
		}
		return this;
	}

	/** Alias for emitter.on(eventName, listener). */
	public addListener(
		eventName: E,
		listener: GenericFunction | WrappedFunction,
	): this
	{
		return this._addListener(eventName, listener, false);
	}

	/**
	 * Synchronously calls each of the listeners registered for the event named
	 * eventName, in the order they were registered, passing the supplied
	 * arguments to each.
	 * @return true if the event had listeners, false otherwise
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public emit(eventName: E, ...args: D[]): boolean
	{
		if (this._events.has(eventName))
		{
			if (
				eventName === "error" &&
				this._events.get(TypedEmitter.errorMonitor as E)
			)
			{
				this.emit(TypedEmitter.errorMonitor as E, ...args);
			}
			const listeners = (this._events.get(
				eventName,
			) as GenericFunction[]).slice(); // We copy with slice() so array is not mutated during emit
			for (const listener of listeners)
			{
				try
				{
				listener.apply(this, args);
				}
				catch (err)
				{
				this.emit("error" as E, err);
				}
			}
		return true;
		}
		else if (eventName === "error")
		{
			if (this._events.get(TypedEmitter.errorMonitor as E))
				this.emit(TypedEmitter.errorMonitor as E, ...args);
			const errMsg = args.length > 0 ? args[0] : Error("Unhandled error.");
			throw errMsg;
		}
		return false;
	}

	/**
	 * Returns an array listing the events for which the emitter has
	 * registered listeners.
	 */
	public eventNames(): [E]
	{
		return Array.from(this._events.keys()) as [E];
	}

	/**
	 * Returns the current max listener value for the TypedEmitter which is
	 * either set by emitter.setMaxListeners(n) or defaults to
	 * TypedEmitter.defaultMaxListeners.
	 */
	public getMaxListeners(): number
	{
		return this.maxListeners || TypedEmitter.defaultMaxListeners;
	}

	/**
	 * Returns the number of listeners listening to the event named
	 * eventName.
	 */
	public listenerCount(eventName: E): number
	{
		if (this._events.has(eventName))
		{
			return (this._events.get(eventName) as GenericFunction[]).length;
		}
		else
			return 0;
	}

	private _listeners(
		target: TypedEmitter<string, unknown>,
		eventName: E,
		unwrap: boolean,
	): GenericFunction[]
	{
		if (!target._events.has(eventName as string))
			return [];

		const eventListeners = target._events.get(eventName as string) as GenericFunction[];

		return unwrap
			? this.unwrapListeners(eventListeners)
			: eventListeners.slice(0);
	}

	private unwrapListeners(arr: GenericFunction[]): GenericFunction[]
	{
		const unwrappedListeners = new Array(arr.length) as GenericFunction[];
		for (let i = 0; i < arr.length; i++)
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			unwrappedListeners[i] = (arr[i] as any)["listener"] || arr[i];
		}
		return unwrappedListeners;
	}

	/** Returns a copy of the array of listeners for the event named eventName.*/
	public listeners(eventName: E): GenericFunction[]
	{
		return this._listeners(this as TypedEmitter<string, unknown>, eventName, true);
	}

	/**
	 * Returns a copy of the array of listeners for the event named eventName,
	 * including any wrappers (such as those created by .once()).
	 */
	public rawListeners(
		eventName: E,
	): Array<GenericFunction | WrappedFunction>
	{
		return this._listeners(this as TypedEmitter<string, unknown>, eventName, false);
	}

	/** Alias for emitter.removeListener(). */
	public off(eventName: E, listener: GenericFunction): this
	{
		return this.removeListener(eventName, listener);
	}

	/**
	 * Adds the listener function to the end of the listeners array for the event
	 *  named eventName. No checks are made to see if the listener has already
	 * been added. Multiple calls passing the same combination of eventName and
	 * listener will result in the listener being added, and called, multiple
	 * times.
	 */
	public on(
		eventName: E,
		listener?: GenericFunction | WrappedFunction,
	): Function
	{
		// standard behavior
		if (listener)
		{
			this.addListener(eventName, listener);
			return () => this;
		}

		// if used as decorator
		const emitter = this;
		return function(
			parent: Object | Function,
			___: string,
			executor: PropertyDescriptor
		)
		{
			// is a method
			if (typeof parent == "object")
				emitter.addListener(eventName, executor.value);

			// is a class
			else if (typeof parent == "function")
			{
				Object.getOwnPropertyNames(parent.prototype).forEach((key: string) =>
				{
					const descriptor = Object.getOwnPropertyDescriptor(parent.prototype, key);
					if (isConstructor(descriptor?.value))
						return;
					emitter.addListener(eventName, descriptor?.value)
				});
			}
		}
	}

	/**
	 * Adds a one-time listener function for the event named eventName. The next
	 * time eventName is triggered, this listener is removed and then invoked.
	 */
	public once(eventName: E, listener?: GenericFunction): Function
	{
		// standard behavior
		if (listener)
		{
			const wrapped: WrappedFunction = this.onceWrap(eventName, listener);
			this.on(eventName, wrapped);
			return () => this;
		}
		
		// if used as decorator
		const emitter = this;
		return function(
			parent: Object | Function,
			___: string,
			executor: PropertyDescriptor
		)
		{
			// is a method
			if (typeof parent == "object")
			{
				const wrapped = emitter.onceWrap(eventName, executor.value);
				emitter.addListener(eventName, wrapped);
			}

			// is a class
			else if (typeof parent == "function")
			{
			Object.getOwnPropertyNames(parent.prototype).forEach((key: string) =>
			{
				const descriptor = Object.getOwnPropertyDescriptor(parent.prototype, key);
				if (isConstructor(descriptor?.value))
					return;
				const wrapped = emitter.onceWrap(eventName, descriptor?.value);
				emitter.addListener(eventName, wrapped);
			});
			}
		}
	}

	// Wrapped function that calls TypedEmitter.removeListener(eventName, self) on execution.
	private onceWrap(
		eventName: E,
		listener: GenericFunction,
	): WrappedFunction
	{
		const wrapper = function (
			this: {
				eventName: E;
				listener: GenericFunction;
				rawListener: GenericFunction | WrappedFunction;
				context: TypedEmitter<string, unknown>;
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			...args: any[]
		): void
		{
			this.context.removeListener(
				this.eventName as string,
				this.rawListener as GenericFunction,
			);
			this.listener.apply(this.context, args);
		};
		const wrapperContext = {
			eventName: eventName,
			listener: listener,
			rawListener: (wrapper as unknown) as WrappedFunction,
			context: this,
		};
		const wrapped = (wrapper.bind(
			wrapperContext as { eventName: E; listener: GenericFunction; rawListener: WrappedFunction | GenericFunction; context: TypedEmitter<string, unknown>; },
		) as unknown) as WrappedFunction;
		wrapperContext.rawListener = wrapped;
		wrapped.listener = listener;
		return wrapped as WrappedFunction;
	}

	/**
	 * Adds the listener function to the beginning of the listeners array for the
	 *  event named eventName. No checks are made to see if the listener has
	 * already been added. Multiple calls passing the same combination of
	 * eventName and listener will result in the listener being added, and
	 * called, multiple times.
	 */
	public prependListener(
		eventName: E,
		listener: GenericFunction | WrappedFunction,
	): this
	{
		return this._addListener(eventName, listener, true);
	}

	/**
	 * Adds a one-time listener function for the event named eventName to the
	 * beginning of the listeners array. The next time eventName is triggered,
	 * this listener is removed, and then invoked.
	 */
	public prependOnceListener(
		eventName: E,
		listener: GenericFunction,
	): this
	{
		const wrapped: WrappedFunction = this.onceWrap(eventName, listener);
		this.prependListener(eventName, wrapped);
		return this;
	}

	/** Removes all listeners, or those of the specified eventName. */
	public removeAllListeners(eventName?: E): this
	{
		if (this._events === undefined)
		{
			return this;
		}

		if (eventName) {
			if (this._events.has(eventName))
			{
				const listeners = (this._events.get(eventName) as Array<GenericFunction | WrappedFunction>).slice(); // Create a copy; We use it AFTER it's deleted.
				this._events.delete(eventName);
			}
		}
		else
		{
			const eventList: [E] = this.eventNames();
			eventList.map((value: E) => {
				this.removeAllListeners(value);
			});
		}
		return this;
	}

	/**
	 * Removes the specified listener from the listener array for the event
	 * named eventName.
	 */
	public removeListener(
		eventName: E,
		listener: GenericFunction,
	): this
	{
		if (this._events.has(eventName))
		{
			const arr:
				| Array<GenericFunction | WrappedFunction>
				| undefined = this._events.get(eventName);

			assert(arr);

			let listenerIndex = -1;
			for (let i = arr.length - 1; i >= 0; i--)
			{
				// arr[i]["listener"] is the reference to the listener inside a bound 'once' wrapper
				if (
					arr[i] == listener ||
					(arr[i] && (arr[i] as WrappedFunction)["listener"] == listener)
				)
				{
					listenerIndex = i;
					break;
				}
			}

			if (listenerIndex >= 0)
			{
				arr.splice(listenerIndex, 1);
				if (arr.length === 0)
					this._events.delete(eventName);
			}
		}
		return this;
	}

	/**
	 * By default TypedEmitters will print a warning if more than 10 listeners
	 * are added for a particular event. This is a useful default that helps
	 * finding memory leaks. Obviously, not all events should be limited to just
	 * 10 listeners. The emitter.setMaxListeners() method allows the limit to be
	 * modified for this specific TypedEmitter instance. The value can be set to
	 * Infinity (or 0) to indicate an unlimited number of listeners.
	 */
	public setMaxListeners(n: number): this
	{
		if (n !== Infinity)
		{
			if (n === 0)
				n = Infinity;
			else
				validateIntegerRange(n, "maxListeners", 0);
		}

		this.maxListeners = n;
		return this;
	}
}

export { TypedEmitter };
/**
 * Creates a Promise that is fulfilled when the TypedEmitter emits the given
 * event or that is rejected when the TypedEmitter emits 'error'. The Promise
 * will resolve with an array of all the arguments emitted to the given event.
 */
export function once(
	emitter: TypedEmitter<string, unknown> | EventTarget,
	name: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]>
{
	return new Promise((resolve, reject) =>
	{
		if (emitter instanceof EventTarget)
		{
			// EventTarget does not have `error` event semantics like Node
			// TypedEmitters, we do not listen to `error` events here.
			emitter.addEventListener(
				name,
				(...args) => {
				resolve(args);
				},
				{ once: true, passive: false, capture: false },
			);
			return;
		}
		else if (emitter instanceof TypedEmitter)
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const eventListener = (...args: any[]): void => {
				if (errorListener !== undefined)
					emitter.removeListener("error", errorListener);
				resolve(args);
			};
			let errorListener: GenericFunction;

			// Adding an error listener is not optional because
			// if an error is thrown on an event emitter we cannot
			// guarantee that the actual event we are waiting will
			// be fired. The result could be a silent way to create
			// memory or file descriptor leaks, which is something
			// we should avoid.
			if (name !== "error")
			{
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				errorListener = (err: any): void =>
				{
					emitter.removeListener(name, eventListener);
					reject(err);
				};

				emitter.once("error", errorListener);
			}

		emitter.once(name, eventListener);
		return;
		}
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createIterResult(value: any, done: boolean): IteratorResult<any>
{
	return { value, done };
}

interface AsyncInterable
{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	next(): Promise<IteratorResult<any, any>>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return(): Promise<IteratorResult<any, any>>;
	throw(err: Error): void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[Symbol.asyncIterator](): any;
}
/**
 * Returns an AsyncIterator that iterates eventName events. It will throw if
 * the TypedEmitter emits 'error'. It removes all listeners when exiting the
 * loop. The value returned by each iteration is an array composed of the
 * emitted event arguments.
 */
export function on<E extends string>(
	emitter: TypedEmitter<string, unknown>,
	event: E,
): AsyncInterable {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const unconsumedEventValues: any[] = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const unconsumedPromises: any[] = [];
	let error: Error | null = null;
	let finished = false;

	const iterator = {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		next(): Promise<IteratorResult<any>> {
		// First, we consume all unread events
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const value: any = unconsumedEventValues.shift();
		if (value) {
			return Promise.resolve(createIterResult(value, false));
		}

		// Then we error, if an error happened
		// This happens one time if at all, because after 'error'
		// we stop listening
		if (error) {
			const p: Promise<never> = Promise.reject(error);
			// Only the first element errors
			error = null;
			return p;
		}

		// If the iterator is finished, resolve to done
		if (finished) {
			return Promise.resolve(createIterResult(undefined, true));
		}

		// Wait until an event happens
		return new Promise(function (resolve, reject) {
			unconsumedPromises.push({ resolve, reject });
		});
		},

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return(): Promise<IteratorResult<any>>
		{
			emitter.removeListener(event, eventHandler);
			emitter.removeListener("error", errorHandler);
			finished = true;

			for (const promise of unconsumedPromises)
				promise.resolve(createIterResult(undefined, true));

			return Promise.resolve(createIterResult(undefined, true));
		},

		throw(err: Error): void
		{
			error = err;
			emitter.removeListener(event, eventHandler);
			emitter.removeListener("error", errorHandler);
		},

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[Symbol.asyncIterator](): any
		{
			return this;
		},
	};

	emitter.on(event, eventHandler);
	emitter.on("error", errorHandler);

	return iterator;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function eventHandler(...args: any[]): void
	{
		const promise = unconsumedPromises.shift();
		if (promise)
			promise.resolve(createIterResult(args, false));
		else
			unconsumedEventValues.push(args);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function errorHandler(err: any): void
	{
		finished = true;

		const toError = unconsumedPromises.shift();
		if (toError)
		toError.reject(err);
		else
			// The next time we call next()
			error = err;

		iterator.return();
	}
}
export const captureRejectionSymbol = Symbol.for("nodejs.rejection");

function isConstructor(f: Function)
{
	try { Reflect.construct(String, [], f) }
	catch { return false }
	return true;
}