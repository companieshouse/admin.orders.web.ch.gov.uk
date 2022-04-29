import {AuthenticationMiddleware} from "../../src/security/AuthenticationMiddleware";
import {SessionKey} from "@companieshouse/node-session-handler/lib/session/keys/SessionKey";
import {SignInInfoKeys} from "@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys";

describe("AuthenticationMiddleware", () => {
    it("Passes the request to the next middleware handler if user is authenticated", async () => {
        // given
        const authenticationMiddleware = new AuthenticationMiddleware();
        const nextFunction = jest.fn();
        const request = {
            session: {
                data: {
                    [SessionKey.SignInInfo]: {
                        [SignInInfoKeys.SignedIn]: 1
                    }
                }
            }
        };

        // when
        await authenticationMiddleware.handler(request as any, {} as any, nextFunction);

        // then
        expect(nextFunction).toHaveBeenCalled();
    });

    it("Redirects the user agent to the sign in page if user is unauthenticated", async () => {
        // given
        const authenticationMiddleware = new AuthenticationMiddleware();
        const request: any = {
            path: "/path/to/service"
        };
        const redirector = jest.fn();
        const response: any = {
            redirect: redirector
        };
        const nextFunction = jest.fn();

        // when
        await authenticationMiddleware.handler(request, response, nextFunction);

        // then
        expect(redirector).toHaveBeenCalledWith("/signin?return_to=/path/to/service");
        expect(nextFunction).toHaveBeenCalledTimes(0);
    });
});
