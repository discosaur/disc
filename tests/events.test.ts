import EventVenter from "../src/events.ts";

const emitter = new EventVenter<"hello", { message: string }>();

emitter.on("hello", ({ message }: { message: string }) =>
	Deno.test("An event with string data is emitted", () =>
	{
		if (typeof message != "string")
			throw new Error();
	})
);

emitter.emit("hello", { message: "Hello, EventVenter!" });
