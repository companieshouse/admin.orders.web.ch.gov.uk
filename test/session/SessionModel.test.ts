import {SessionKey} from "@companieshouse/node-session-handler/lib/session/keys/SessionKey";
import {SignInInfoKeys} from "@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys";
import {UserProfileKeys} from "@companieshouse/node-session-handler/lib/session/keys/UserProfileKeys";
import {SessionModel} from "../../src/session/SessionModel";
import {Session} from "@companieshouse/node-session-handler";

describe("SessionModel", () => {
    it("Returns true if user has permission /admin/chs-order-investigation", () => {
        // given
        const session = new Session({
            [SessionKey.SignInInfo]: {
                [SignInInfoKeys.UserProfile]: {
                    [UserProfileKeys.Permissions]: {
                        "/admin/chs-order-investigation": 1
                    }
                }
            }
        });
        const sessionModel = new SessionModel(session);

        // when
        const actual = sessionModel.permittedToInvestigateOrders();

        // then
        expect(actual).toEqual(true);
    });

    it("Returns false if user does not have permission /admin/chs-order-investigation", () => {
        // given
        const session = new Session({
            [SessionKey.SignInInfo]: {
                [SignInInfoKeys.UserProfile]: {
                    [UserProfileKeys.Permissions]: {
                    }
                }
            }
        });
        const sessionModel = new SessionModel(session);

        // when
        const actual = sessionModel.permittedToInvestigateOrders();

        // then
        expect(actual).toEqual(false);
    });

    it("Returns true if the user is signed in", () => {
        // given
        const session = new Session({
            [SessionKey.SignInInfo]: {
                [SignInInfoKeys.SignedIn]: 1
            }
        });
        const sessionModel = new SessionModel(session);

        // when
        const actual = sessionModel.isUserSignedIn();

        // then
        expect(actual).toEqual(true);
    });

    it("Returns false if the user is not signed in", () => {
        // given
        const session = new Session({
            [SessionKey.SignInInfo]: {
            }
        });
        const sessionModel = new SessionModel(session);

        // when
        const actual = sessionModel.isUserSignedIn();

        // then
        expect(actual).toEqual(false);
    });

    it("Returns the user's ID", () => {
        // given
        const session = new Session({
            [SessionKey.SignInInfo]: {
                [SignInInfoKeys.UserProfile]: {
                    [UserProfileKeys.UserId]: "F00DFACE"
                }
            }
        });
        const sessionModel = new SessionModel(session);

        // when
        const actual = sessionModel.getUserId();

        // then
        expect(actual).toEqual("F00DFACE");
    });

    it("Returns an empty string if user ID absent", () => {
        // given
        const session = new Session({
            [SessionKey.SignInInfo]: {
                [SignInInfoKeys.UserProfile]: {
                }
            }
        });
        const sessionModel = new SessionModel(session);

        // when
        const actual = sessionModel.getUserId();

        // then
        expect(actual).toEqual("");
    });

    it("Returns the user's access token", () => {
        // given
        const session = new Session({
            [SessionKey.SignInInfo]: {
                [SignInInfoKeys.AccessToken]: {
                    [SignInInfoKeys.AccessToken]: "F00DFACE"
                }
            }
        });
        const sessionModel = new SessionModel(session);

        // when
        const actual = sessionModel.getAccessToken();

        // then
        expect(actual).toEqual("F00DFACE");
    });

    it("Returns an empty string if access token nonexistent", () => {
        // given
        const session = new Session({
            [SessionKey.SignInInfo]: {
                [SignInInfoKeys.AccessToken]: {
                }
            }
        });
        const sessionModel = new SessionModel(session);

        // when
        const actual = sessionModel.getAccessToken();

        // then
        expect(actual).toEqual("");
    });
});
