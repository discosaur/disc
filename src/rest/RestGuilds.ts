import {
	GuildRes,
	GuildModifyReq,
	EmojiRes,
	CreateEmojiReq,
	ModifyEmojiReq,
	AuditLogOptionsReq,
	AuditLogRes,
	SomeObject
} from "../typings/mod.ts";
import { RestClient } from "./mod.ts";

class RestGuilds
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

	public Get(id: string)
	{
		return new RestGuild(this._rest, id);
	}
}

class RestGuild
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
	public Get(onlyPreview?: boolean): Promise<GuildRes>
	{
		return this._rest.get(onlyPreview == true
			? this.route + "/preview"
			: this.route);
	}

	public Modify(opts: GuildModifyReq): Promise<GuildRes>
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
	public getMembers()
	{
		return this._rest.get(this.route + "/members");
	}

	public getMember(id: string)
	{
		return this._rest.get(`${this.route}/members/${id}`);
	}

	public addMember(id: string, opts: SomeObject)
	{
		return this._rest.put(`${this.route}/members/${id}`, opts);
	}

	public modifyMember(id: string, opts: SomeObject)
	{
		return this._rest.patch(`${this.route}/members/${id}`, opts);
	}

	public removeMember(id: string)
	{
		return this._rest.delete(`${this.route}/members/${id}`);
	}

	public modifyOwnNick(id: string, nick: string)
	{
		return this._rest.put(`${this.route}/members/@me/nick`, { nick: nick });
	}
	//#endregion

	//#region Roles
	public getRoles()
	{
		return this._rest.get(this.route + "/roles");
	}
	
	public createRole()
	{
		return this._rest.get(this.route + "/roles");
	}
	
	public reorderRoles(opts: SomeObject)
	{
		return this._rest.patch(this.route + "/roles", opts);
	}
	
	public modifyRole(id: string, opts: SomeObject)
	{
		return this._rest.patch(`${this.route}/roles/${id}`, opts);
	}
	
	public deleteRole(id: string)
	{
		return this._rest.delete(`${this.route}/roles/${id}`);
	}

	public assignRoleToMember(userId: string, roleId: string)
	{
		return this._rest.put(`${this.route}/members/${userId}/roles/${roleId}`);
	}

	public removeRoleFromMember(userId: string, roleId: string)
	{
		return this._rest.delete(`${this.route}/members/${userId}/roles/${roleId}`);
	}
	//#endregion

	//#region Bans
	public getBans()
	{
		return this._rest.get(this.route + "bans");
	}

	public getBan(id: string)
	{
		return this._rest.get(`${this.route}/bans/${id}`);
	}

	public createBan(id: string)
	{
		return this._rest.put(`${this.route}/bans/${id}`);
	}
	
	public removeBan(id: string)
	{
		return this._rest.delete(`${this.route}/bans/${id}`);
	}
	//#endregion

	//#region Prune
	public getPruneCount()
	{
		return this._rest.get(this.route + "/prune");
	}

	public beginPrune(opts?: SomeObject)
	{
		return this._rest.post(this.route + "/prune", opts);
	}
	//#endregion

	//#region Integrations
	public getIntegrations()
	{
		return this._rest.get(this.route + "/integrations");
	}

	public createIntegrations(opts: SomeObject)
	{
		return this._rest.post(this.route + "/integrations", opts);
	}

	public modifyIntegrations(id: string, opts: SomeObject)
	{
		return this._rest.post(`${this.route}/integrations/${id}`, opts);
	}

	public deleteIntegrations(id: string)
	{
		return this._rest.delete(`${this.route}/integrations/${id}`);
	}

	public syncIntegrations(id: string)
	{
		return this._rest.post(`${this.route}/integrations/${id}/sync`);
	}
	//#endregion

	//#region Widget
	public getWidget()
	{
		return this._rest.get(this.route + "/widget");
	}

	public modifyWidget(opts: SomeObject)
	{
		return this._rest.patch(this.route + "/widget", opts);
	}

	public getWidgetImage()
	{
		return this._rest.get(this.route + "/widget.png");
	}
	//#endregion

	//#region Emojis
	public listEmojis(): Promise<EmojiRes[]>
	{
		return this._rest.get(this.route + "/emojis");
	}

	public getEmoji(id: string): Promise<EmojiRes>
	{
		return this._rest.get(`${this.route}/emojis/${id}`);
	}

	public createEmoji(id: string, opts: CreateEmojiReq): Promise<EmojiRes>
	{
		return this._rest.post(`${this.route}/emojis/${id}`, opts);
	}

	public modifyEmoji(id: string, opts: ModifyEmojiReq): Promise<EmojiRes>
	{
		return this._rest.patch(`${this.route}/emojis/${id}`, opts);
	}

	public deleteEmoji(id: string): Promise<void>
	{
		return this._rest.delete(`${this.route}/emojis/${id}`);
	}
	//#endregion

	//#region Misc
	public getVoiceRegions()
	{
		return this._rest.get(this.route + "/regions");
	}

	public getInvites()
	{
		return this._rest.get(this.route + "/invites");
	}

	public getVanityUrl()
	{
		return this._rest.get(this.route + "/vanity-url");
	}

	public getAuditLog(opts?: AuditLogOptionsReq): Promise<AuditLogRes>
	{
		let nRoute = this.route;
		
		// TODO: Append options to route

		return this._rest.get(nRoute + "/audit-logs");
	}
	//#endregion
}

export { RestGuilds as Guilds, RestGuild as Guild };