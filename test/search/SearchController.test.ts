import {SearchController} from "../../src/search/SearchController";
import {jest} from "@jest/globals";
import {NextFunction, Request} from "express";
import {SearchResults} from "../../src/search/SearchResults";
import {ViewModel} from "../../src/core/ViewModel";
import {Status} from "../../src/core/Status";
import {OrderSummary} from "../../src/search/OrderSummary";
import {SearchCriteria} from "../../src/search/SearchCriteria";
import {OrderSearchParameters} from "../../src/search/OrderSearchParameters";
import {BACK_LINK_TOGGLER} from "../../src/config/BackLinkToggler";
import { getAppWithMockedCsrf } from "../../test/__mocks__/csrf.mocks";
import sinon from "sinon";

describe("SearchController", () => {

    let app;
    beforeEach(() => {
        app = getAppWithMockedCsrf(sinon.createSandbox());
    });

    it("Handles get requests", async () => {
        // given
        const pageFactory: any = {};
        const response: any = {};
        const controller = new SearchController({} as any, pageFactory);
        const expectedViewModel = new ViewModel("template1", [{
            template: "template2"
        } as ViewModel]);
        BACK_LINK_TOGGLER.searchPageBackLinkEnabled = false;

        pageFactory.buildInitialSearchPage = jest.fn(() => {
            return expectedViewModel;
        });
        response.render = jest.fn();

        // when
        await controller.handleGet({} as Request, response, {} as NextFunction);

        // then
        expect(response.render).toHaveBeenCalledWith("template1", {
            control: expectedViewModel,
            renderBackButton: false
        });
    });

    it("Renders any results returned from the service", async () => {
        // given
        const service: any = {};
        const serviceProvider: any = {
            service: service,
            maximumResults: 1000
        };
        const expectedSearchResults = [{
            id: "ORD-123123-123123"
        } as OrderSummary];
        const expectedResults = new SearchResults(Status.SUCCESS, expectedSearchResults, 10);
        service.findOrders = jest.fn(async () => {
            return expectedResults;
        });
        const pageFactory: any = {};
        const expectedViewModel = new ViewModel("template1", [{
            template: "template2"
        } as ViewModel]);
        BACK_LINK_TOGGLER.searchPageBackLinkEnabled = false;

        pageFactory.buildSearchPageWithResults = jest.fn((): ViewModel => {
            return expectedViewModel;
        });
        
        const request: any = {
            body: {
                orderNumber: "ORD-123123-123123"
            },
            orderAdminSession: {
                getAccessToken: jest.fn(() => {
                    return "F00DFACE";
                })
            }
        };
        const response: any = {};
        response.render = jest.fn();
        const expectedSearchCriteria = new SearchCriteria(1000, "ORD-123123-123123");
        const expectedSearchParameters = new OrderSearchParameters(expectedSearchCriteria, "F00DFACE");
        const controller = new SearchController(serviceProvider, pageFactory);
        const nextFunction = jest.fn();

        // when
        await controller.handlePost(request, response, nextFunction);

        // then
        expect(request.orderAdminSession.getAccessToken).toHaveBeenCalled();
        expect(service.findOrders).toHaveBeenCalledWith(expectedSearchParameters);
        expect(pageFactory.buildSearchPageWithResults).toHaveBeenCalledWith(expectedSearchCriteria, expectedResults);
        expect(response.render).toHaveBeenCalledWith("template1", {
            control: expectedViewModel,
            renderBackButton: false
        });
        expect(nextFunction).toHaveBeenCalledTimes(0);
    });

    it("Renders service unavailable if error returned by service", async () => {
        // given
        const service: any = {};
        const serviceProvider: any = {
            service: service
        };
        const expectedViewModel = new ViewModel("template1", []);
        const pageFactory: any = {};
        pageFactory.buildServiceUnavailable = jest.fn((): ViewModel => {
            return expectedViewModel;
        });
        service.findOrders = jest.fn(async () => {
            return {
                status: Status.SERVER_ERROR
            };
        });
        const expectedSearchParameters = new OrderSearchParameters({} as SearchCriteria, "F00DFACE");
        const controller = new SearchController(serviceProvider, pageFactory);
        const request: any = {
            body: {},
            orderAdminSession: {
                getAccessToken: jest.fn(() => {
                    return "F00DFACE";
                })
            }
        }
        const response: any = {};
        response.render = jest.fn();
        const nextFunction = jest.fn();

        // when
        await controller.handlePost(request, response, nextFunction);

        // then
        expect(request.orderAdminSession.getAccessToken).toHaveBeenCalled();
        expect(service.findOrders).toHaveBeenCalledWith(expectedSearchParameters);
        expect(pageFactory.buildServiceUnavailable).toHaveBeenCalled();
        expect(response.render).toHaveBeenCalledWith("template1", {
            control: expectedViewModel
        });
        expect(nextFunction).toHaveBeenCalledTimes(0);
    });
})
