import { RestClient } from "./mod.ts";
import { SomeObject } from "../typings/mod.ts";
import {
	IGetGuild,
	IGuildModify,
	IEmoji,
	ICreateEmoji,
	IModifyEmoji,
	IGetAuditLogOptions,
	IAuditLog
} from "../typings/mod.ts";

class Guilds
{
	private readonly _rest: RestClient;

	private readonly route: string = "guilds";

	constructor(rClient: RestClient)
	{
		this._rest = rClient;
	}

	public Create(opts: SomeObject)
	{
		return this._rest.post(this.route, opts);
	}

	// Own Guilds are hidden somewhere else
	// public Get()
	// {
	// 	return this._rest.get(this.route);
	// }

	public Get(id: string)
	{
		return new Guild(this._rest, id);
	}
}

class Guild
{
	private readonly _rest: RestClient;

	public readonly id: string;
	private readonly route: string;

	constructor(rClient: RestClient, id: string)
	{
		this._rest = rClient;
		this.id = id;
		this.route = "guilds/" + this.id;
	}
	//#region General
	public Get(onlyPreview?: boolean): Promise<IGetGuild>
	{
		return this._rest.get(onlyPreview == true
			? this.route + "/preview"
			: this.route);
	}

	public Modify(opts: IGuildModify): Promise<IGetGuild>
	{
		return this._rest.patch(this.route, opts);
	}

	public Delete(): Promise<void>
	{
		return this._rest.delete(this.route);
	}
	//#endregion

	//#region Channels
	public GetChannels(): Promise<unknown[]>
	{
		return this._rest.get(this.route + "/channels");
	}

	public ModifyChannels(id: string, opts: {
		name?: string,
		type: "TEXT" | "NEWS",
		position: number
	})
	{
		return this._rest.patch(`${this.route}/channels/${id}`, opts);
	}

	public ReorderChannels(opts: SomeObject)
	{
		return this._rest.patch(this.route + "/channels", opts)
	}
	//#endregion

	//#region Members
	public GetMembers()
	{
		return this._rest.get(this.route + "/members");
	}

	public GetMember(id: string)
	{
		throw new Error("not implemented");
		return this._rest.get(`${this.route}/members/${id}`);
	}

	public AddMember(id: string, opts: SomeObject)
	{
		return this._rest.put(`${this.route}/members/${id}`, opts);
	}

	public ModifyMember(id: string, opts: SomeObject)
	{
		return this._rest.patch(`${this.route}/members/${id}`, opts);
	}

	public RemoveMember(id: string)
	{
		return this._rest.delete(`${this.route}/members/${id}`);
	}

	public ModifyOwnNick(id: string, nick: string)
	{
		return this._rest.put(`${this.route}/members/@me/nick`, { nick: nick });
	}
	//#endregion

	//#region Roles
	public GetRoles()
	{
		return this._rest.get(this.route + "/roles");
	}
	
	public CreateRole()
	{
		return this._rest.get(this.route + "/roles");
	}
	
	public ReorderRoles(opts: SomeObject)
	{
		return this._rest.patch(this.route + "/roles", opts);
	}
	
	public ModifyRole(id: string, opts: SomeObject)
	{
		return this._rest.patch(`${this.route}/roles/${id}`, opts);
	}
	
	public DeleteRole(id: string)
	{
		return this._rest.delete(`${this.route}/roles/${id}`);
	}

	public AssignRoleToMember(userId: string, roleId: string)
	{
		return this._rest.put(`${this.route}/members/${userId}/roles/${roleId}`);
	}

	public RemoveRoleFromMember(userId: string, roleId: string)
	{
		return this._rest.delete(`${this.route}/members/${userId}/roles/${roleId}`);
	}
	//#endregion

	//#region Bans
	public GetBans()
	{
		return this._rest.get(this.route + "bans");
	}

	public GetBan(id: string)
	{
		return this._rest.get(`${this.route}/bans/${id}`);
	}

	public CreateBan(id: string)
	{
		return this._rest.put(`${this.route}/bans/${id}`);
	}
	
	public RemoveBan(id: string)
	{
		return this._rest.delete(`${this.route}/bans/${id}`);
	}
	//#endregion

	//#region Prune
	public GetPruneCount()
	{
		return this._rest.get(this.route + "/prune");
	}

	public BeginPrune(opts?: SomeObject)
	{
		return this._rest.post(this.route + "/prune", opts);
	}
	//#endregion

	//#region Integrations
	public GetIntegrations()
	{
		return this._rest.get(this.route + "/integrations");
	}

	public CreateIntegrations(opts: SomeObject)
	{
		return this._rest.post(this.route + "/integrations", opts);
	}

	public ModifyIntegrations(id: string, opts: SomeObject)
	{
		return this._rest.post(`${this.route}/integrations/${id}`, opts);
	}

	public DeleteIntegrations(id: string)
	{
		return this._rest.delete(`${this.route}/integrations/${id}`);
	}

	public SyncIntegrations(id: string)
	{
		return this._rest.post(`${this.route}/integrations/${id}/sync`);
	}
	//#endregion

	//#region Widget
	public GetWidget()
	{
		return this._rest.get(this.route + "/widget");
	}

	public ModifyWidget(opts: SomeObject)
	{
		return this._rest.patch(this.route + "/widget", opts);
	}

	public GetWidgetImage()
	{
		return this._rest.get(this.route + "/widget.png");
	}
	//#endregion

	//#region Emojis
	public ListEmojis(): Promise<IEmoji[]>
	{
		return this._rest.get(this.route + "/emojis");
	}

	public GetEmoji(id: string): Promise<IEmoji>
	{
		return this._rest.get(`${this.route}/emojis/${id}`);
	}

	public CreateEmoji(id: string, opts: ICreateEmoji): Promise<IEmoji>
	{
		return this._rest.post(`${this.route}/emojis/${id}`, opts);
	}

	public ModifyEmoji(id: string, opts: IModifyEmoji): Promise<IEmoji>
	{
		return this._rest.patch(`${this.route}/emojis/${id}`, opts);
	}

	public DeleteEmoji(id: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/emojis/${id}`);
	}
	//#endregion

	//#region Misc
	public GetVoiceRegions()
	{
		return this._rest.get(this.route + "/regions");
	}

	public GetInvites()
	{
		return this._rest.get(this.route + "/invites");
	}

	public GetVanityUrl()
	{
		return this._rest.get(this.route + "/vanity-url");
	}

	public GetAuditLog(opts?: IGetAuditLogOptions): Promise<IAuditLog>
	{
		let nRoute = this.route;
		
		// TODO: Append options to route

		return this._rest.get(nRoute + "/audit-logs");
	}
	//#endregion
}

export { Guilds, Guild };