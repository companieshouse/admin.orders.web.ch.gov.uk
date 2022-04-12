import {SearchController} from "../../src/search/SearchController";
import {jest} from "@jest/globals";
import {NextFunction, Request} from "express";
import {SearchResults} from "../../src/search/SearchResults";
import {ViewModel} from "../../src/core/ViewModel";
import {Status} from "../../src/core/Status";
import {OrderSummary} from "../../src/search/OrderSummary";
import {SearchCriteria} from "../../src/search/SearchCriteria";
import {OrderSearchParameters} from "../../src/search/OrderSearchParameters";

describe("SearchController", () => {

    it("Handles get requests", async () => {
        // given
        const pageFactory: any = {};
        const response: any = {};
        const controller = new SearchController({} as any, pageFactory);
        const expectedViewModel = new ViewModel("template1", [{
            template: "template2"
        } as ViewModel]);

        pageFactory.buildInitialSearchPage = jest.fn(() => {
            return expectedViewModel;
        });
        response.render = jest.fn();

        // when
        await controller.handleGet({} as Request, response, {} as NextFunction);

        // then
        expect(response.render).toHaveBeenCalledWith("template1", {
            control: expectedViewModel
        });
    });

    it("Renders any results returned from the service", async () => {
        // given
        const service: any = {};
        const serviceProvider: any = {
            service: service
        };
        service.findOrders = jest.fn(async () => {
            return new SearchResults(Status.SUCCESS, expectedSearchResults);
        });
        const pageFactory: any = {};
        const expectedViewModel = new ViewModel("template1", [{
            template: "template2"
        } as ViewModel]);
        pageFactory.buildSearchPageWithResults = jest.fn((): ViewModel => {
            return expectedViewModel;
        });
        const request: any = {
            body: {
                orderNumber: "ORD-123123-123123"
            }
        };
        const response: any = {};
        response.render = jest.fn();
        const expectedSearchCriteria = new SearchCriteria("ORD-123123-123123");
        const controller = new SearchController(serviceProvider, pageFactory);
        const expectedSearchResults = [{
            id: "ORD-123123-123123"
        } as OrderSummary];

        // when
        await controller.handlePost(request, response, {} as NextFunction);

        // then
        expect(service.findOrders).toHaveBeenCalledWith(new OrderSearchParameters(expectedSearchCriteria));
        expect(pageFactory.buildSearchPageWithResults).toHaveBeenCalledWith(expectedSearchCriteria, expectedSearchResults);
        expect(response.render).toHaveBeenCalledWith("template1", {
            control: expectedViewModel
        });
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
            return new SearchResults(Status.SERVER_ERROR, []);
        });
        const controller = new SearchController(serviceProvider, pageFactory);
        const response: any = {};
        response.status = jest.fn();
        response.render = jest.fn();

        // when
        await controller.handlePost({body: {}} as any, response, {} as any);

        // then
        expect(pageFactory.buildServiceUnavailable).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.render).toHaveBeenCalledWith("template1", {
            control: expectedViewModel
        });
    });
})
