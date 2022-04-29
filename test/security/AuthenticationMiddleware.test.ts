import {AuthenticationMiddleware} from "../../src/security/AuthenticationMiddleware";

describe("AuthenticationMiddleware", () => {
    it("Passes the request to the next middleware handler if user is authenticated", async () => {
        // given
        const authenticationMiddleware = new AuthenticationMiddleware();
        const nextFunction = jest.fn();
        const request = {
            orderAdminSession: {
                isUserSignedIn: jest.fn(() => {
                    return true;
                }),
                getUserId: jest.fn(() => {
                    return "F00DFACE"
                })
            }
        };

        // when
        await authenticationMiddleware.handler(request as any, {} as any, nextFunction);

        // then
        expect(nextFunction).toHaveBeenCalled();
        expect(request.orderAdminSession.isUserSignedIn).toHaveBeenCalled();
        expect(request.orderAdminSession.getUserId).toHaveBeenCalled();
    });

    it("Redirects the user agent to the sign in page if user is unauthenticated", async () => {
        // given
        const authenticationMiddleware = new AuthenticationMiddleware();
        const request: any = {
            orderAdminSession: {
                isUserSignedIn: jest.fn(() => {
                    return false;
                })
            },
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
        expect(request.orderAdminSession.isUserSignedIn).toHaveBeenCalled();
        expect(nextFunction).toHaveBeenCalledTimes(0);
    });
});
