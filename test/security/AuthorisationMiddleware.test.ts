import {AuthorisationMiddleware} from "../../src/security/AuthorisationMiddleware";

describe("AuthorisationMiddleware", () => {
    it("Calls the next middleware in the chain if user has permission /admin/chs-order-investigation", () => {
        // given
        const orderAdminSession = {
            permittedToInvestigateOrders: jest.fn(() => {
                return true;
            }),
            getUserId: jest.fn(() => {
                return "F00DFACE";
            })
        };
        const pageFactory = {
            buildUnauthorised: jest.fn()
        };
        const middleware = new AuthorisationMiddleware({} as any);
        const request: any = {
            orderAdminSession: orderAdminSession
        };
        const response: any = {
            render: jest.fn()
        };
        const nextFunction = jest.fn();

        // when
        middleware.handler(request, response, nextFunction);

        // then
        expect(orderAdminSession.permittedToInvestigateOrders).toHaveBeenCalled();
        expect(orderAdminSession.getUserId).toHaveBeenCalled();
        expect(response.render).toHaveBeenCalledTimes(0);
        expect(pageFactory.buildUnauthorised).toHaveBeenCalledTimes(0);
        expect(nextFunction).toHaveBeenCalled();
    });

    it("Renders unauthorised page if permission /admin/chs-order-investigation is absent", () => {
        // given
        const orderAdminSession = {
            permittedToInvestigateOrders: jest.fn(() => {
                return false;
            }),
            getUserId: jest.fn(() => {
                return "F00DFACE";
            })
        };
        const pageFactory = {
            buildUnauthorised: jest.fn(() => {
                return {
                    template: "unauthorised"
                }
            })
        };
        const middleware = new AuthorisationMiddleware(pageFactory as any);
        const request: any = {
            orderAdminSession: orderAdminSession
        };
        const renderingFunction = jest.fn();
        const response: any = {
            render: renderingFunction
        };
        const nextFunction = jest.fn();

        // when
        middleware.handler(request, response, nextFunction);

        // then
        expect(orderAdminSession.permittedToInvestigateOrders).toHaveBeenCalled();
        expect(orderAdminSession.getUserId).toHaveBeenCalled();
        expect(pageFactory.buildUnauthorised).toHaveBeenCalled();
        expect(renderingFunction).toHaveBeenCalledWith("unauthorised", { control: { template: "unauthorised" }});
        expect(nextFunction).toHaveBeenCalledTimes(0);
    });
});
