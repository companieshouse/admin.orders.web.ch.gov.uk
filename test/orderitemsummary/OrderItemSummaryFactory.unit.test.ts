import { OrderItemMapper } from "../../src/orderitemsummary/OrderItemMapper";
import { OrderItemSummaryFactory } from "../../src/orderitemsummary/OrderItemSummaryFactory";
import { Item } from "@companieshouse/api-sdk-node/dist/services/order/order/types";
import { mockMissingImageDeliveryItem } from "../__mocks__/mocks";
import { MissingImageDeliveryMapper } from "../../src/orderitemsummary/MissingImageDeliveryMapper";
import { NullOrderItemMapper } from "../../src/orderitemsummary/NullOrderItemMapper";
import { MapperRequest } from "../../src/mappers/MapperRequest";

describe("OrderItemSummaryFactory", () => {
    describe("getMapper", () => {
        it("Returns a missing image delivery mapper for missing image delivery item kind", async () => {
            // given
            const factory = new OrderItemSummaryFactory();
            // when
            const mapper: OrderItemMapper = factory.getMapper(new MapperRequest("ORD-123123-123123", mockMissingImageDeliveryItem));
            // then
            expect(mapper).toBeInstanceOf(MissingImageDeliveryMapper);
        });

        it("Returns a null item mapper for unknown item kind", async () => {
            // given
            const factory = new OrderItemSummaryFactory();
            const unknownCert: Item = {
                ...mockMissingImageDeliveryItem,
                kind: "unknown"
            };
            // when
            const mapper: OrderItemMapper = factory.getMapper(new MapperRequest("ORD-123123-123123", unknownCert));
            // then
            expect(mapper).toBeInstanceOf(NullOrderItemMapper);
        });
    });
});
