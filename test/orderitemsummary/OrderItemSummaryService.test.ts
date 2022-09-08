import {mockMidOrderItemView, mockMissingImageDeliveryItem} from "../__mocks__/mocks";
import {OrderItemSummaryService} from "../../src/orderitemsummary/OrderItemSummaryService";
import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {Item} from "@companieshouse/api-sdk-node/dist/services/order/order/types";
import {OrderItemRequest} from "../../src/orderitemsummary/OrderItemRequest";
import {jest} from "@jest/globals";
import {OrderItemView} from "../../src/orderitemsummary/OrderItemView";
import {MapperRequest} from "../../src/mappers/MapperRequest";
import {Status} from "../../dist/core/Status";
import {OrderItemErrorResponse} from "@companieshouse/api-sdk-node/dist/services/order/order-item/service";
import {OrderItemSummaryFactory} from "../../src/orderitemsummary/OrderItemSummaryFactory";

describe("OrderItemSummaryService", () => {
    describe("getOrderItem", () => {
        it("Returns a mapped order item", async () => {
            // given
            const response = new Success<Item, OrderItemErrorResponse>(mockMissingImageDeliveryItem);

            const orderItem: any = {};
            orderItem.getOrderItem = jest.fn(() => {
                return response;
            });
            const apiClientFactory: any = {};
            apiClientFactory.newApiClient = jest.fn(() => {
                return {
                    orderItem: orderItem
                };
            });

            const mappedResults: OrderItemView = {
                status: Status.SUCCESS,
                viewModel: mockMidOrderItemView
            }

            const mapper: any = {};
            mapper.map = jest.fn(() => {})
            mapper.getMappedOrder = jest.fn(() => {
                return mappedResults
            })

            const factory: any = {};
            factory.getMapper = jest.fn(() => {
                return mapper;
            });

            const service = new OrderItemSummaryService(apiClientFactory, factory);

            // when
            const result = await service.getOrderItem(new OrderItemRequest("123123", "ORD-123456-123456", "MID-123456-123456"));

            // then
            expect(result).toStrictEqual({
                status: Status.SUCCESS,
                viewModel: mappedResults
            });
            expect(apiClientFactory.newApiClient).toHaveBeenCalled();
            expect(orderItem.getOrderItem).toHaveBeenCalledWith("ORD-123456-123456", "MID-123456-123456");
            expect(mapper.map).toHaveBeenCalled();
            expect(mapper.getMappedOrder).toHaveBeenCalled();
            expect(factory.getMapper).toHaveBeenCalledWith(new MapperRequest( "ORD-123456-123456", mockMissingImageDeliveryItem));
        });

        it("Returns client error when api returns 404 not found", async () => {
            // given
            const response = new Failure<Item, OrderItemErrorResponse>({
                httpStatusCode: 404,
                error: "Not found"
            });

            const orderItem: any = {};
            orderItem.getOrderItem = jest.fn(() => {
                return response;
            });

            const mapper: any = {};
            mapper.map = jest.fn(() => {})
            mapper.getMappedOrder = jest.fn(() => {})

            const factory: any = {};
            factory.getMapper = jest.fn(() => {});

            const apiClientFactory: any = {};
            apiClientFactory.newApiClient = jest.fn(() => {
                return {
                    orderItem: orderItem
                };
            });

            const mappedResults: OrderItemView = {
                status: Status.CLIENT_ERROR,
            }

            const service = new OrderItemSummaryService(apiClientFactory, new OrderItemSummaryFactory());

            // when
            const result = await service.getOrderItem(new OrderItemRequest("123123", "ORD-123456-123456", "MID-123456-123456"));

            // then
            expect(result).toStrictEqual(mappedResults);
            expect(apiClientFactory.newApiClient).toHaveBeenCalled();
            expect(orderItem.getOrderItem).toHaveBeenCalledWith("ORD-123456-123456", "MID-123456-123456");
            expect(mapper.map).toHaveBeenCalledTimes(0);
            expect(mapper.getMappedOrder).toHaveBeenCalledTimes(0);
            expect(factory.getMapper).toHaveBeenCalledTimes(0);
        });

        it("Returns client error when api returns 404 not found", async () => {
            // given
            const response = new Failure<Item, OrderItemErrorResponse>({
                httpStatusCode: 500
            });

            const orderItem: any = {};
            orderItem.getOrderItem = jest.fn(() => {
                return response;
            });
            const apiClientFactory: any = {};
            apiClientFactory.newApiClient = jest.fn(() => {
                return {
                    orderItem: orderItem
                };
            });

            const mappedResults: OrderItemView = {
                status: Status.SERVER_ERROR,
            }

            const service = new OrderItemSummaryService(apiClientFactory, new OrderItemSummaryFactory());

            // when
            const result = await service.getOrderItem(new OrderItemRequest("123123", "ORD-123456-123456", "MID-123456-123456"));

            // then
            expect(result).toStrictEqual(mappedResults);
            expect(apiClientFactory.newApiClient).toHaveBeenCalled();
            expect(orderItem.getOrderItem).toHaveBeenCalledWith("ORD-123456-123456", "MID-123456-123456");
        });
    });
});
