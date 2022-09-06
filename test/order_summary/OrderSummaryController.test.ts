import {OrderSummaryController} from "../../src/order_summary/OrderSummaryController";
import {OrderSummaryResult} from "../../src/order_summary/OrderSummaryService";
import {Status} from "../../src/core/Status";
import {PageFactory} from "../../src/order_summary/PageFactory";
import {OrderSummary} from "../../src/order_summary/OrderSummary";
import {ViewModel} from "../../src/core/ViewModel";
import { Request, Response } from "express";
import "../../src/session/OrderAdminSession";
import {SessionModel} from "../../src/session/SessionModel";
import {OrderSummaryService} from "../../src/order_summary/OrderSummaryService";

describe("OrderSummaryController", () => {
    describe("readOrder", () => {
        it("Renders order information if resource found", async () => {
            // given
            const expectedSummary = {
                itemSummary: [],
                hasDeliverableItems: false
            } as OrderSummary;
            const expectedOrderSummary = {
                status: Status.SUCCESS,
                summary: expectedSummary
            } as OrderSummaryResult;
            const mockService = {} as OrderSummaryService;
            mockService.fetchOrderSummary = jest.fn((orderId: string, token: string): Promise<OrderSummaryResult> => Promise.resolve(expectedOrderSummary));
            const expectedViewModel = {
                template: "template"
            } as ViewModel;
            const mockPageFactory = {} as PageFactory;
            mockPageFactory.buildOrderSummaryPage = jest.fn((summary: OrderSummary): ViewModel => expectedViewModel);

            const mockRequest = {} as Request;
            const orderAdminSession = {} as SessionModel;
            mockRequest.orderAdminSession = orderAdminSession;
            mockRequest.params = {
                orderId: "ORD-123123-123123"
            };
            orderAdminSession.getAccessToken = jest.fn((): string => "access_token");
            orderAdminSession.getUserId = jest.fn((): string => "user_id");

            const mockResponse = {} as Response;
            mockResponse.render = jest.fn(() => {});

            const mockNextFunction = jest.fn(() => {});

            const controller = new OrderSummaryController(mockService, mockPageFactory);

            // when
            await controller.readOrder(mockRequest, mockResponse, mockNextFunction);

            // then
            expect(mockService.fetchOrderSummary).toHaveBeenCalledWith("ORD-123123-123123", "access_token");
            expect(mockPageFactory.buildOrderSummaryPage).toHaveBeenCalledWith(expectedSummary);
            expect(mockResponse.render).toHaveBeenCalledWith("template", {
                control: expectedViewModel,
                renderBackButton: true
            });
        });

        it("Renders not found if resource not found", async () => {
            // given
            const expectedOrderSummary = {
                status: Status.CLIENT_ERROR
            } as OrderSummaryResult;
            const mockService = {} as OrderSummaryService;
            mockService.fetchOrderSummary = jest.fn((orderId: string, token: string): Promise<OrderSummaryResult> => Promise.resolve(expectedOrderSummary));
            const expectedViewModel = {
                template: "template"
            } as ViewModel;
            const mockPageFactory = {} as PageFactory;
            mockPageFactory.buildNotFound = jest.fn((): ViewModel => expectedViewModel);

            const mockRequest = {} as Request;
            const orderAdminSession = {} as SessionModel;
            mockRequest.orderAdminSession = orderAdminSession;
            mockRequest.params = {
                orderId: "ORD-123123-123123"
            };
            orderAdminSession.getAccessToken = jest.fn((): string => "access_token");
            orderAdminSession.getUserId = jest.fn((): string => "user_id");

            const mockResponse = {} as Response;
            mockResponse.render = jest.fn(() => {});

            const mockNextFunction = jest.fn(() => {});

            const controller = new OrderSummaryController(mockService, mockPageFactory);

            // when
            await controller.readOrder(mockRequest, mockResponse, mockNextFunction);

            // then
            expect(mockService.fetchOrderSummary).toHaveBeenCalledWith("ORD-123123-123123", "access_token");
            expect(mockPageFactory.buildNotFound).toHaveBeenCalled();
            expect(mockResponse.render).toHaveBeenCalledWith("template", {
                control: expectedViewModel,
                renderBackButton: true
            });
        });

        it("Renders service unavailable if server error occurs", async () => {
            // given
            const expectedOrderSummary = {
                status: Status.SERVER_ERROR
            } as OrderSummaryResult;
            const mockService = {} as OrderSummaryService;
            mockService.fetchOrderSummary = jest.fn((orderId: string, token: string): Promise<OrderSummaryResult> => Promise.resolve(expectedOrderSummary));
            const expectedViewModel = {
                template: "template"
            } as ViewModel;
            const mockPageFactory = {} as PageFactory;
            mockPageFactory.buildServiceUnavailable = jest.fn((): ViewModel => expectedViewModel);

            const mockRequest = {} as Request;
            const orderAdminSession = {} as SessionModel;
            mockRequest.orderAdminSession = orderAdminSession;
            mockRequest.params = {
                orderId: "ORD-123123-123123"
            };
            orderAdminSession.getAccessToken = jest.fn((): string => "access_token");
            orderAdminSession.getUserId = jest.fn((): string => "user_id");

            const mockResponse = {} as Response;
            mockResponse.render = jest.fn(() => {});

            const mockNextFunction = jest.fn(() => {});

            const controller = new OrderSummaryController(mockService, mockPageFactory);

            // when
            await controller.readOrder(mockRequest, mockResponse, mockNextFunction);

            // then
            expect(mockService.fetchOrderSummary).toHaveBeenCalledWith("ORD-123123-123123", "access_token");
            expect(mockPageFactory.buildServiceUnavailable).toHaveBeenCalled();
            expect(mockResponse.render).toHaveBeenCalledWith("template", {
                control: expectedViewModel,
                renderBackButton: true
            });
        });
    });
});
