

export class RawCache<T>
{
	private rest: unknown;
	private socket?: unknown;
	private cached: Partial<T> = {};

	public constructor(r: unknown, w?: unknown)
	{
		this.rest = r;
		this.socket = w;
	}

	
	public get get(): T
	{
		// throw new Error();
		return (this.rest as any).get() as T;
	}

	
	public set set(v: T)
	{
		this.rest = v;
	}
	
	
}
