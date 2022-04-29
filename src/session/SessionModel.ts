import {Session} from "@companieshouse/node-session-handler";
import {SessionKey} from "@companieshouse/node-session-handler/lib/session/keys/SessionKey";
import {SignInInfoKeys} from "@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys";
import {UserProfileKeys} from "@companieshouse/node-session-handler/lib/session/keys/UserProfileKeys";

export class SessionModel {
    private session: Session | undefined;

    constructor(session: Session | undefined) {
        this.session = session;
    }

    permittedToInvestigateOrders(): boolean {
        return this.session?.data?.
            [SessionKey.SignInInfo]?.
            [SignInInfoKeys.UserProfile]?.
            [UserProfileKeys.Permissions]?.
            ["/admin/chs-order-investigation"] === 1;
    }

    isUserSignedIn(): boolean {
        return this.session?.data?.
            [SessionKey.SignInInfo]?.
            [SignInInfoKeys.SignedIn] === 1;
    }

    getUserId(): string {
        return this.session?.data?.
            [SessionKey.SignInInfo]?.
            [SignInInfoKeys.UserProfile]?.
            [UserProfileKeys.UserId] || "";
    }

    getAccessToken(): string {
        return this.session?.data?.
            [SessionKey.SignInInfo]?.
            [SignInInfoKeys.AccessToken]?.
            [SignInInfoKeys.AccessToken] || "";
    }
}
