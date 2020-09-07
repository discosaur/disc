import { RestClient as Rest } from "./RestClient.ts"
import {
	ICreateMessage
} from "../../deps.ts";

export class Channel
{
	protected readonly _rest: Rest;

	public readonly id: string;
	protected readonly route: string;

	constructor(rClient: Rest, id: string)
	{
		this._rest = rClient;
		this.id = id;
		this.route = "/channels/" + id;
	}

	//#region General
	public Get(): Promise<unknown>
	{
		return this._rest.get(this.route);
	}

	public Modify(opts: unknown): Promise<unknown>
	{
		return this._rest.get(this.route, opts);
	}

	public Delete(): Promise<unknown>
	{
		return this._rest.delete(this.route);
	}
	//#endregion

	//#region Messages
	public GetMessages(): Promise<unknown[]>
	{
		// TODO: query params
		return this._rest.get(`${this.route}/messages`);
	}

	public GetMessage(id: string): Promise<unknown>
	{
		return this._rest.get(`${this.route}/messages/${id}`);
	}

	public CreateMessage(opts: ICreateMessage): Promise<unknown>
	{
		// TODO: WARNING Before using this endpoint, you must connect to and identify with a gateway at least once.
		return this._rest.post(`${this.route}/messages`, opts);
	}
	
	public EditMessage(msgId: string, opts: unknown): Promise<unknown>
	{
		return this._rest.patch(`${this.route}/messages/${msgId}`, opts);
	}

	public DeleteMessage(msgId: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}`);
	}

	public BulkDeleteMessages(msgs: string[]): Promise<void>
	{
		return this._rest.post(`${this.route}/messages/bulk-delete`, { messages: msgs});
	}
	//#endregion

	//#region Message Pins
	public GetPinnedMessages(): Promise<unknown[]>
	{
		return this._rest.get(`${this.route}/pins`);
	}

	public AddPinnedMessage(id: string): Promise<void>
	{
		return this._rest.put(`${this.route}/pins/${id}`);
	}
	
	public DeletePinnedMessage(id: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/pins/${id}`);
	}
	//#endregion

	//#region Reactions
	public CreateReaction(msgId: string, emoji: unknown): Promise<void>
	{
		return this._rest.put(`${this.route}/messages/${msgId}/reactions/${emoji}/@me`);
	}

	public DeleteOwnReaction(msgId: string, emoji: unknown): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/reactions/${emoji}/@me`);
	}

	public DeleteUserReaction(msgId: string, emoji: unknown, userId: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/reactions/${emoji}/${userId}`);
	}

	public GetReactions(msgId: string, emoji: unknown, query?: unknown): Promise<unknown>
	{
		return this._rest.get(`${this.route}/messages/${msgId}/reactions/${emoji}`, query);
	}

	public DeleteAllReactions(msgId: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/reactions`);
	}

	public DeleteAllReactionsForEmoji(msgId: string, emoji: unknown): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/reactions/${emoji}`);
	}
	//#endregion

	//#region Invites
	public CreateInvite(opts?: unknown): Promise<unknown>
	{
		return this._rest.post(`${this.route}/invites`, opts ?? {});
	}

	public GetInvites(): Promise<unknown[]>
	{
		return this._rest.get(`${this.route}/invites`);
	}
	//#endregion

	//#region Permissions
	public CreatePermissions(overrideId: string, opts: unknown): Promise<void>
	{
		return this._rest.put(`${this.route}/permissions/${overrideId}`, opts);
	}
	
	public EditPermissions(overrideId: string, opts: unknown): Promise<void>
	{
		return this._rest.put(`${this.route}/permissions/${overrideId}`, opts);
	}
	
	public DeletePermissions(overrideId: string): Promise<void>
	{
		return this._rest.put(`${this.route}/permissions/${overrideId}`);
	}
	//#endregion

	//#region Misc
	public TriggerTypingIndicator(): Promise<void>
	{
		return this._rest.post(`${this.route}/typing`);
	}
	//#endregion
}

export class GroupChannel extends Channel
{
	constructor(rClient: Rest, id: string)
	{
		super(rClient, id);
	}
	
	//#region Group DM options
	public GroupDmAddRecipient(id: string, opts?: unknown): Promise<void>
	{
		return this._rest.put(`${this.route}/recipients/${id}`, opts);
	}

	public GroupDmRemoveRecipient(id: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/recipients/${id}`);
	}
	//#endregion
}
