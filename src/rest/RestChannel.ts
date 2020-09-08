import { RestClient } from "./RestClient.ts"
import { SomeObject, SomeChannel, UserRes, MessageRes, MessageReq, Invite } from "../typings/mod.ts";

export class RestChannel
{
	protected readonly _rest: RestClient;

	public readonly id: string;
	protected readonly route: string;

	constructor(rClient: RestClient, id: string)
	{
		this._rest = rClient;
		this.id = id;
		this.route = "channels/" + id;
	}

	//#region General
	public get(): Promise<SomeChannel>
	{
		return this._rest.get(this.route);
	}

	public modify(): Promise<SomeChannel>
	{
		return this._rest.get(this.route);
	}

	public delete(): Promise<SomeChannel>
	{
		// yes, it returns channel
		return this._rest.delete(this.route);
	}
	//#endregion

	//#region Messages
	public getMessages(): Promise<MessageRes[]>
	{
		// TODO: query params
		return this._rest.get(`${this.route}/messages`);
	}

	public getMessage(id: string): Promise<MessageRes>
	{
		return this._rest.get(`${this.route}/messages/${id}`);
	}

	public createMessage(opts: MessageReq): Promise<MessageRes>
	{
		// TODO: WARNING Before using this endpoint, you must connect to and identify with a gateway at least once.
		return this._rest.post(`${this.route}/messages`, opts);
	}
	
	public editMessage(msgId: string, opts: SomeObject): Promise<MessageRes>
	{
		return this._rest.patch(`${this.route}/messages/${msgId}`, opts);
	}

	public deleteMessage(msgId: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}`);
	}

	public crosspostMessage(msgId: string): Promise<MessageRes>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/crosspost`);
	}

	public bulkDeleteMessages(msgs: string[]): Promise<void>
	{
		return this._rest.post(`${this.route}/messages/bulk-delete`, { messages: msgs});
	}
	//#endregion

	//#region Message Pins
	public getPinnedMessages(): Promise<MessageRes[]>
	{
		return this._rest.get(`${this.route}/pins`);
	}

	public addPinnedMessage(id: string): Promise<void>
	{
		return this._rest.put(`${this.route}/pins/${id}`);
	}
	
	public deletePinnedMessage(id: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/pins/${id}`);
	}
	//#endregion

	//#region Reactions
	public createReaction(msgId: string, emoji: unknown): Promise<void>
	{
		return this._rest.put(`${this.route}/messages/${msgId}/reactions/${emoji}/@me`);
	}

	public deleteOwnReaction(msgId: string, emoji: unknown): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/reactions/${emoji}/@me`);
	}

	public deleteUserReaction(msgId: string, emoji: unknown, userId: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/reactions/${emoji}/${userId}`);
	}

	public getReactions(msgId: string, emoji: unknown): Promise<UserRes>
	{
		return this._rest.get(`${this.route}/messages/${msgId}/reactions/${emoji}`);
	}

	public deleteAllReactions(msgId: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/reactions`);
	}

	public deleteAllReactionsForEmoji(msgId: string, emoji: unknown): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/reactions/${emoji}`);
	}
	//#endregion

	//#region Invites
	public createInvite(opts?: SomeObject): Promise<Invite>
	{
		return this._rest.post(`${this.route}/invites`, opts);
	}

	public getInvites(): Promise<Invite[]>
	{
		return this._rest.get(`${this.route}/invites`);
	}
	//#endregion

	//#region Permissions
	public createPermissions(overrideId: string, opts: SomeObject): Promise<void>
	{
		return this._rest.put(`${this.route}/permissions/${overrideId}`, opts);
	}
	
	public editPermissions(overrideId: string, opts: SomeObject): Promise<void>
	{
		return this._rest.put(`${this.route}/permissions/${overrideId}`, opts);
	}
	
	public deletePermissions(overrideId: string): Promise<void>
	{
		return this._rest.put(`${this.route}/permissions/${overrideId}`);
	}
	//#endregion

	//#region Misc
	public triggerTypingIndicator(): Promise<void>
	{
		return this._rest.post(`${this.route}/typing`);
	}
	//#endregion
}

export class RestGroupChannel extends RestChannel
{
	constructor(rClient: RestClient, id: string)
	{
		super(rClient, id);
	}
	
	//#region Group DM options
	public groupDmAddRecipient(id: string, opts?: SomeObject): Promise<void>
	{
		return this._rest.put(`${this.route}/recipients/${id}`, opts);
	}

	public groupDmRemoveRecipient(id: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/recipients/${id}`);
	}
	//#endregion
}
