import {
	GuildRes,
	GuildModifyReq,
	EmojiRes,
	CreateEmojiReq,
	ModifyEmojiReq,
	AuditLogOptionsReq,
	AuditLogRes,
	SomeObject, IGuildMember
} from "../typings/mod.ts";
import { RestClient } from "./mod.ts";

export class RestGuilds
{
	private readonly _rest: RestClient;

	private readonly route: string = "guilds";

	constructor(rClient: RestClient)
	{
		this._rest = rClient;
	}

	public Create(opts: SomeObject): Promise<unknown>
	{
		return this._rest.post<unknown>(this.route, opts);
	}

	public Get(id: string)
	{
		return new RestGuild(this._rest, id);
	}
}

export class RestGuild
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
		return this._rest.patch<GuildRes>(this.route, opts);
	}

	public Delete(): Promise<void>
	{
		return this._rest.delete(this.route);
	}
	//#endregion

	//#region Channels
	public GetChannels(): Promise<unknown[]>
	{
		return this._rest.get<unknown[]>(this.route + "/channels");
	}

	public ModifyChannels(id: string, opts: {
		name?: string,
		type: "TEXT" | "NEWS",
		position: number
	}): Promise<unknown>
	{
		return this._rest.patch<unknown>(`${this.route}/channels/${id}`, opts);
	}

	public ReorderChannels(opts: SomeObject): Promise<unknown>
	{
		return this._rest.patch<unknown>(this.route + "/channels", opts)
	}
	//#endregion

	//#region Members
	public getMembers(limit?: number | "max"): Promise<IGuildMember[]>
	{
		limit ??= 1;
		if (limit = "max")
			limit = 100;
		else if (limit > 100)
			throw new Error("Limit can not be greater than 100");
		else if (limit < 1)
			throw new Error("Limit can not be less than 1");
		
		return this._rest.get<IGuildMember[]>(`${this.route}/members?limit=${limit}`);
	}

	public getMember(id: string): Promise<IGuildMember>
	{
		return this._rest.get<IGuildMember>(`${this.route}/members/${id}`);
	}

	public addMember(id: string, opts: SomeObject): Promise<unknown>
	{
		return this._rest.put<unknown>(`${this.route}/members/${id}`, opts);
	}

	public modifyMember(id: string, opts: SomeObject): Promise<unknown>
	{
		return this._rest.patch<unknown>(`${this.route}/members/${id}`, opts);
	}

	public removeMember(id: string): Promise<unknown>
	{
		return this._rest.delete<unknown>(`${this.route}/members/${id}`);
	}

	public modifyOwnNick(id: string, nick: string): Promise<unknown>
	{
		return this._rest.put<unknown>(`${this.route}/members/@me/nick`, { nick: nick });
	}
	//#endregion

	//#region Roles
	public getRoles(): Promise<unknown>
	{
		return this._rest.get<unknown>(this.route + "/roles");
	}
	
	public createRole(): Promise<unknown>
	{
		return this._rest.get<unknown>(this.route + "/roles");
	}
	
	public reorderRoles(opts: SomeObject): Promise<unknown>
	{
		return this._rest.patch<unknown>(this.route + "/roles", opts);
	}
	
	public modifyRole(id: string, opts: SomeObject): Promise<unknown>
	{
		return this._rest.patch<unknown>(`${this.route}/roles/${id}`, opts);
	}
	
	public deleteRole(id: string): Promise<unknown>
	{
		return this._rest.delete<unknown>(`${this.route}/roles/${id}`);
	}

	public assignRoleToMember(userId: string, roleId: string): Promise<unknown>
	{
		return this._rest.put<unknown>(`${this.route}/members/${userId}/roles/${roleId}`);
	}

	public removeRoleFromMember(userId: string, roleId: string): Promise<unknown>
	{
		return this._rest.delete<unknown>(`${this.route}/members/${userId}/roles/${roleId}`);
	}
	//#endregion

	//#region Bans
	public getBans(): Promise<unknown>
	{
		return this._rest.get<unknown>(this.route + "bans");
	}

	public getBan(id: string): Promise<unknown>
	{
		return this._rest.get<unknown>(`${this.route}/bans/${id}`);
	}

	public createBan(id: string): Promise<unknown>
	{
		return this._rest.put<unknown>(`${this.route}/bans/${id}`);
	}
	
	public removeBan(id: string): Promise<unknown>
	{
		return this._rest.delete<unknown>(`${this.route}/bans/${id}`);
	}
	//#endregion

	//#region Prune
	public getPruneCount(): Promise<unknown>
	{
		return this._rest.get<unknown>(this.route + "/prune");
	}

	public beginPrune(opts?: SomeObject): Promise<unknown>
	{
		return this._rest.post<unknown>(this.route + "/prune", opts);
	}
	//#endregion

	//#region Integrations
	public getIntegrations(): Promise<unknown>
	{
		return this._rest.get<unknown>(this.route + "/integrations");
	}

	public createIntegrations(opts: SomeObject): Promise<unknown>
	{
		return this._rest.post<unknown>(this.route + "/integrations", opts);
	}

	public modifyIntegrations(id: string, opts: SomeObject): Promise<unknown>
	{
		return this._rest.post<unknown>(`${this.route}/integrations/${id}`, opts);
	}

	public deleteIntegrations(id: string): Promise<unknown>
	{
		return this._rest.delete<unknown>(`${this.route}/integrations/${id}`);
	}

	public syncIntegrations(id: string): Promise<unknown>
	{
		return this._rest.post<unknown>(`${this.route}/integrations/${id}/sync`);
	}
	//#endregion

	//#region Widget
	public getWidget(): Promise<unknown>
	{
		return this._rest.get<unknown>(this.route + "/widget");
	}

	public modifyWidget(opts: SomeObject): Promise<unknown>
	{
		return this._rest.patch<unknown>(this.route + "/widget", opts);
	}

	public getWidgetImage(): Promise<unknown>
	{
		return this._rest.get<unknown>(this.route + "/widget.png");
	}
	//#endregion

	//#region Emojis
	public listEmojis(): Promise<EmojiRes[]>
	{
		return this._rest.get<EmojiRes[]>(this.route + "/emojis");
	}

	public getEmoji(id: string): Promise<EmojiRes>
	{
		return this._rest.get<EmojiRes>(`${this.route}/emojis/${id}`);
	}

	public createEmoji(id: string, opts: CreateEmojiReq): Promise<EmojiRes>
	{
		return this._rest.post<EmojiRes>(`${this.route}/emojis/${id}`, opts);
	}

	public modifyEmoji(id: string, opts: ModifyEmojiReq): Promise<EmojiRes>
	{
		return this._rest.patch(`${this.route}/emojis/${id}`, opts);
	}

	public deleteEmoji(id: string): Promise<void>
	{
		return this._rest.delete<void>(`${this.route}/emojis/${id}`);
	}
	//#endregion

	//#region Misc
	public getVoiceRegions(): Promise<void>
	{
		return this._rest.get<void>(this.route + "/regions");
	}

	public getInvites(): Promise<void>
	{
		return this._rest.get<void>(this.route + "/invites");
	}

	public getVanityUrl(): Promise<void>
	{
		return this._rest.get<void>(this.route + "/vanity-url");
	}

	public getAuditLog(opts?: AuditLogOptionsReq): Promise<AuditLogRes>
	{
		let nRoute = this.route;
		
		// TODO: Append options to route

		return this._rest.get<AuditLogRes>(nRoute + "/audit-logs");
	}
	//#endregion
}
