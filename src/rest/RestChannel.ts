import { RestClient } from "./RestClient.ts"
import {
	SomeObject,
	APIChannel,
	APIUser,
	APIMessage,
	RestPostAPIChannelMessageFormDataBody,
	APIInvite
} from "../typings/mod.ts";

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
	public get()
	{
		return this._rest.get<APIChannel>(this.route);
	}

	public modify()
	{
		return this._rest.get<APIChannel>(this.route);
	}

	public delete()
	{
		return this._rest.delete<APIChannel>(this.route);
	}
	//#endregion

	//#region Messages
	public getMessages()
	{
		// TODO: query params
		return this._rest.get<APIMessage[]>(`${this.route}/messages`);
	}

	public getMessage(id: string)
	{
		return this._rest.get<APIMessage>(`${this.route}/messages/${id}`);
	}

	public createMessage(opts: RestPostAPIChannelMessageFormDataBody)
	{
		// WARNING: Before using this endpoint, you must connect to and identify with a gateway at least once.
		return this._rest.post<APIMessage>(`${this.route}/messages`, opts);
	}
	
	public editMessage(msgId: string, opts: SomeObject)
	{
		return this._rest.patch<APIMessage>(`${this.route}/messages/${msgId}`, opts);
	}

	public deleteMessage(msgId: string)
	{
		return this._rest.delete<void>(`${this.route}/messages/${msgId}`);
	}

	public crosspostMessage(msgId: string)
	{
		return this._rest.delete<APIMessage>(`${this.route}/messages/${msgId}/crosspost`);
	}

	public bulkDeleteMessages(msgs: string[])
	{
		return this._rest.post<void>(`${this.route}/messages/bulk-delete`, { messages: msgs});
	}
	//#endregion

	//#region Message Pins
	public getPinnedMessages()
	{
		return this._rest.get<APIMessage[]>(`${this.route}/pins`);
	}

	public addPinnedMessage(id: string)
	{
		return this._rest.put<void>(`${this.route}/pins/${id}`);
	}
	
	public deletePinnedMessage(id: string)
	{
		return this._rest.delete<void>(`${this.route}/pins/${id}`);
	}
	//#endregion

	//#region Reactions
	public createReaction(msgId: string, emoji: unknown)
	{
		return this._rest.put<void>(`${this.route}/messages/${msgId}/reactions/${emoji}/@me`);
	}

	public deleteOwnReaction(msgId: string, emoji: unknown)
	{
		return this._rest.delete<void>(`${this.route}/messages/${msgId}/reactions/${emoji}/@me`);
	}

	public deleteUserReaction(msgId: string, emoji: unknown, userId: string)
	{
		return this._rest.delete<void>(`${this.route}/messages/${msgId}/reactions/${emoji}/${userId}`);
	}

	public getReactions(msgId: string, emoji: unknown)
	{
		return this._rest.get<APIUser>(`${this.route}/messages/${msgId}/reactions/${emoji}`);
	}

	public deleteAllReactions(msgId: string)
	{
		return this._rest.delete<void>(`${this.route}/messages/${msgId}/reactions`);
	}

	public deleteAllReactionsForEmoji(msgId: string, emoji: unknown)
	{
		return this._rest.delete<void>(`${this.route}/messages/${msgId}/reactions/${emoji}`);
	}
	//#endregion

	//#region Invites
	public createInvite(opts?: SomeObject)
	{
		return this._rest.post<APIInvite>(`${this.route}/invites`, opts);
	}

	public getInvites()
	{
		return this._rest.get<APIInvite[]>(`${this.route}/invites`);
	}
	//#endregion

	//#region Permissions
	public createPermissions(overrideId: string, opts: SomeObject)
	{
		return this._rest.put<void>(`${this.route}/permissions/${overrideId}`, opts);
	}
	
	public editPermissions(overrideId: string, opts: SomeObject)
	{
		return this._rest.put<void>(`${this.route}/permissions/${overrideId}`, opts);
	}
	
	public deletePermissions(overrideId: string)
	{
		return this._rest.put<void>(`${this.route}/permissions/${overrideId}`);
	}
	//#endregion

	//#region Misc
	public triggerTypingIndicator()
	{
		return this._rest.post<void>(`${this.route}/typing`);
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
	public groupDmAddRecipient(id: string, opts?: SomeObject)
	{
		return this._rest.put<void>(`${this.route}/recipients/${id}`, opts);
	}

	public groupDmRemoveRecipient(id: string)
	{
		return this._rest.delete<void>(`${this.route}/recipients/${id}`);
	}
	//#endregion
}
