import { RestClient as Rest } from "./RestClient.ts"
import { ICreateMessage, SomeObject, anyChannelType, IMessage, IUser } from "../typings/mod.ts";
import { IInvite } from "../typings/InviteModel.ts";

export class RestChannel
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
	public Get(): Promise<anyChannelType>
	{
		return this._rest.get(this.route);
	}

	public Modify(): Promise<anyChannelType>
	{
		return this._rest.get(this.route);
	}

	public Delete(): Promise<anyChannelType>
	{
		// yes, it returns channel
		return this._rest.delete(this.route);
	}
	//#endregion

	//#region Messages
	public GetMessages(): Promise<IMessage[]>
	{
		// TODO: query params
		return this._rest.get(`${this.route}/messages`);
	}

	public GetMessage(id: string): Promise<IMessage>
	{
		return this._rest.get(`${this.route}/messages/${id}`);
	}

	public CreateMessage(opts: ICreateMessage): Promise<IMessage>
	{
		// TODO: WARNING Before using this endpoint, you must connect to and identify with a gateway at least once.
		return this._rest.post(`${this.route}/messages`, opts);
	}
	
	public EditMessage(msgId: string, opts: SomeObject): Promise<IMessage>
	{
		return this._rest.patch(`${this.route}/messages/${msgId}`, opts);
	}

	public DeleteMessage(msgId: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}`);
	}

	public CrosspostMessage(msgId: string): Promise<IMessage>
	{
		return this._rest.delete(`${this.route}/messages/${msgId}/crosspost`);
	}

	public BulkDeleteMessages(msgs: string[]): Promise<void>
	{
		return this._rest.post(`${this.route}/messages/bulk-delete`, { messages: msgs});
	}
	//#endregion

	//#region Message Pins
	public GetPinnedMessages(): Promise<IMessage[]>
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

	public GetReactions(msgId: string, emoji: unknown): Promise<IUser>
	{
		return this._rest.get(`${this.route}/messages/${msgId}/reactions/${emoji}`);
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
	public CreateInvite(opts?: SomeObject): Promise<IInvite>
	{
		return this._rest.post(`${this.route}/invites`, opts);
	}

	public GetInvites(): Promise<IInvite[]>
	{
		return this._rest.get(`${this.route}/invites`);
	}
	//#endregion

	//#region Permissions
	public CreatePermissions(overrideId: string, opts: SomeObject): Promise<void>
	{
		return this._rest.put(`${this.route}/permissions/${overrideId}`, opts);
	}
	
	public EditPermissions(overrideId: string, opts: SomeObject): Promise<void>
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

export class RestGroupChannel extends RestChannel
{
	constructor(rClient: Rest, id: string)
	{
		super(rClient, id);
	}
	
	//#region Group DM options
	public GroupDmAddRecipient(id: string, opts?: SomeObject): Promise<void>
	{
		return this._rest.put(`${this.route}/recipients/${id}`, opts);
	}

	public GroupDmRemoveRecipient(id: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/recipients/${id}`);
	}
	//#endregion
}
