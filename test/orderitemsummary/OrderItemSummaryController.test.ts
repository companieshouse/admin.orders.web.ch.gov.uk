import { Request, Response } from "express";
import {OrderItemSummaryController} from "../../src/orderitemsummary/OrderItemSummaryController";
import {OrderItemSummaryService} from "../../src/orderitemsummary/OrderItemSummaryService";
import {Status} from "../../src/core/Status";
import {GlobalPageFactory} from "../../src/core/GlobalPageFactory";
import {OrderItemView} from "../../src/orderitemsummary/OrderItemView";
import "../../src/session/OrderAdminSession";
import {SessionModel} from "../../src/session/SessionModel";
import {ViewModel} from "../../src/core/ViewModel";

describe("OrderItemSummaryController", () => {
    describe("viewSummary", () => {
        it("Renders a view mapped from an order item", async () => {
            // given
            const mockRequest = {} as Request;
            mockRequest.params = {
                orderId: "ORD-123123-123123",
                itemId: "MID-123123-123123"
            };
            const sessionModel = {} as SessionModel;
            sessionModel.getAccessToken = jest.fn(() => "access_token");
            sessionModel.getUserId = jest.fn(() => "user_id");
            mockRequest.orderAdminSession = sessionModel;
            const mockResponse = {} as Response;
            mockResponse.render = jest.fn();
            const nextFunction = jest.fn();
            const mockService = {} as OrderItemSummaryService;
            const viewModel = {
                template: "page"
            };
            const orderItemResult = {
                status: Status.SUCCESS,
                viewModel: viewModel
            } as OrderItemView;
            mockService.getOrderItem = jest.fn(() => Promise.resolve(orderItemResult));
            const pageFactory = {} as GlobalPageFactory;
            const controller = new OrderItemSummaryController(mockService, pageFactory);

            // when
            await controller.viewSummary(mockRequest, mockResponse, nextFunction);

            // then
            expect(mockService.getOrderItem).toHaveBeenCalledWith({
                apiToken: "access_token",
                orderId: "ORD-123123-123123",
                itemId: "MID-123123-123123"
            });
            expect(mockResponse.render).toHaveBeenCalledWith("page", {
                control: viewModel,
                renderBackButton: true
            });
        });
        it("Renders not found if resource not found", async () => {
            // given
            const expectedResult = {
                status: Status.CLIENT_ERROR
            } as OrderItemView;
            const mockService = {} as OrderItemSummaryService;
            mockService.getOrderItem = jest.fn((): Promise<OrderItemView> => Promise.resolve(expectedResult));
            const expectedViewModel = {
                template: "template"
            } as ViewModel;
            const mockPageFactory = {} as GlobalPageFactory;
            mockPageFactory.buildNotFound = jest.fn((): ViewModel => expectedViewModel);

            const mockRequest = {} as Request;
            const orderAdminSession = {} as SessionModel;
            mockRequest.orderAdminSession = orderAdminSession;
            mockRequest.params = {
                orderId: "ORD-123123-123123",
                itemId: "MID-123123-123123"
            };
            orderAdminSession.getAccessToken = jest.fn((): string => "access_token");
            orderAdminSession.getUserId = jest.fn((): string => "user_id");

            const mockResponse = {} as Response;
            mockResponse.render = jest.fn(() => {});

            const mockNextFunction = jest.fn(() => {});

            const controller = new OrderItemSummaryController(mockService, mockPageFactory);

            // when
            await controller.viewSummary(mockRequest, mockResponse, mockNextFunction);

            // then
            expect(mockService.getOrderItem).toHaveBeenCalledWith({
                apiToken: "access_token",
                orderId: "ORD-123123-123123",
                itemId: "MID-123123-123123"
            });
            expect(mockPageFactory.buildNotFound).toHaveBeenCalled();
            expect(mockResponse.render).toHaveBeenCalledWith("template", {
                control: expectedViewModel,
                renderBackButton: true
            });
        });

        it("Renders service unavailable if server error occurs", async () => {
            // given
            const expectedResult = {
                status: Status.SERVER_ERROR
            } as OrderItemView;
            const mockService = {} as OrderItemSummaryService;
            mockService.getOrderItem = jest.fn((): Promise<OrderItemView> => Promise.resolve(expectedResult));
            const expectedViewModel = {
                template: "template"
            } as ViewModel;
            const mockPageFactory = {} as GlobalPageFactory;
            mockPageFactory.buildServiceUnavailable = jest.fn((): ViewModel => expectedViewModel);

            const mockRequest = {} as Request;
            const orderAdminSession = {} as SessionModel;
            mockRequest.orderAdminSession = orderAdminSession;
            mockRequest.params = {
                orderId: "ORD-123123-123123",
                itemId: "MID-123123-123123"
            };
            orderAdminSession.getAccessToken = jest.fn((): string => "access_token");
            orderAdminSession.getUserId = jest.fn((): string => "user_id");

            const mockResponse = {} as Response;
            mockResponse.render = jest.fn(() => {});

            const mockNextFunction = jest.fn(() => {});

            const controller = new OrderItemSummaryController(mockService, mockPageFactory);

            // when
            await controller.viewSummary(mockRequest, mockResponse, mockNextFunction);

            // then
            expect(mockService.getOrderItem).toHaveBeenCalledWith({
                apiToken: "access_token",
                orderId: "ORD-123123-123123",
                itemId: "MID-123123-123123"
            });
            expect(mockPageFactory.buildServiceUnavailable).toHaveBeenCalled();
            expect(mockResponse.render).toHaveBeenCalledWith("template", {
                control: expectedViewModel,
                renderBackButton: true
            });
        });
    });
});
