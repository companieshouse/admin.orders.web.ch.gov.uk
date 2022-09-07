import { MissingImageDeliveryMapper } from "../../src/orderitemsummary/MissingImageDeliveryMapper";
import { OrderItemView } from "../../src/orderitemsummary/OrderItemView";
import { expect } from "chai";
import { MapperRequest } from "../../src/mappers/MapperRequest";
import { mockMissingImageDeliveryItem, mockMidOrderItemView } from "../__mocks__/order.mocks";

describe("MissingImageDeliveryMapper", () => {
    describe("map", () => {
        it("Maps a mapper request for a missing image delivery item to a GovUkOrderItemSummaryView", async () => {
            // given
            const mapper: MissingImageDeliveryMapper = new MissingImageDeliveryMapper(new MapperRequest("ORD-123456-123456", mockMissingImageDeliveryItem));

            // when
            mapper.map();
            const actual: OrderItemView = mapper.getMappedOrder();

            // then
            expect(actual.data).to.deep.equal(mockMidOrderItemView);
            expect(actual.template).to.equal("order-item-summary-mid");
        });
    });
});
