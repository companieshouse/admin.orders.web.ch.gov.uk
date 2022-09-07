import {mockMidOrderItemView, mockMissingImageDeliveryItem} from "../__mocks__/order.mocks";
import {OrderItemSummaryService} from "../../src/orderitemsummary/OrderItemSummaryService";
import {Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {Item} from "@companieshouse/api-sdk-node/dist/services/order/order/types";
import {OrderItemRequest} from "../../src/orderitemsummary/OrderItemRequest";
import {jest} from "@jest/globals";
import {OrderItemView} from "../../src/orderitemsummary/OrderItemView";
import {MapperRequest} from "../../src/mappers/MapperRequest";
import {Status} from "../../dist/core/Status";
import {OrderItemErrorResponse} from "@companieshouse/api-sdk-node/dist/services/order/order-item/service";

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
                data: mockMidOrderItemView
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
            expect(result).toStrictEqual(mappedResults);
            expect(apiClientFactory.newApiClient).toHaveBeenCalled();
            expect(orderItem.getOrderItem).toHaveBeenCalledWith("ORD-123456-123456", "MID-123456-123456");
            expect(mapper.map).toHaveBeenCalled();
            expect(mapper.getMappedOrder).toHaveBeenCalled();
            expect(factory.getMapper).toHaveBeenCalledWith(new MapperRequest( "ORD-123456-123456", mockMissingImageDeliveryItem));
        });

        // it("Propagates exception thrown by API client", async () => {
        //     // given
        //     const expectedError = new InternalServerError();
        //     sandbox.stub(apiClient, "getOrderItem")
        //         .throws(expectedError);
        //     const mappedOrder = {};
        //     const mapper = {
        //         map: sandbox.spy(),
        //         getMappedOrder: sandbox.stub().returns(mappedOrder)
        //     };
        //     const factory = {
        //         getMapper: sandbox.stub().returns(mapper)
        //     };
        //     const service = new OrderItemSummaryService(factory);
        //
        //     await expect(service.getOrderItem({
        //         apiToken: "F00DFACE",
        //         orderId: "ORD-123456-123456",
        //         itemId: "MID-123456-123456"
        //     })).to.be.rejectedWith(expectedError);
        //     expect(apiClient.getOrderItem).to.be.calledOnceWith("ORD-123456-123456", "MID-123456-123456");
        //     expect(mapper.getMappedOrder).to.not.be.called;
        //     expect(mapper.map).to.not.be.called;
        //     expect(factory.getMapper).to.not.be.called;
        // });
    });
});
