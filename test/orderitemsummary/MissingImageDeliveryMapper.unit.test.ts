import { MissingImageDeliveryMapper } from "../../src/orderitemsummary/MissingImageDeliveryMapper";
import { MapperRequest } from "../../src/mappers/MapperRequest";
import {mockCheckoutNoItems, mockMidOrderItemView, mockMissingImageDeliveryItem} from "../__mocks__/mocks";
import {FilingHistoryMapper} from "../../src/mappers/FilingHistoryMapper";
import {ServerPaths} from "../../src/application/ServerPaths";

describe("MissingImageDeliveryMapper", () => {
    describe("map", () => {
        it("Maps a mapper request for a missing image delivery item to a GovUkOrderItemSummaryView", async () => {
            // given
            const mapper: MissingImageDeliveryMapper = new MissingImageDeliveryMapper(new MapperRequest("ORD-123456-123456", {...mockCheckoutNoItems, items: [mockMissingImageDeliveryItem]}, mockMissingImageDeliveryItem), new FilingHistoryMapper({
                applicationRootDir: "."
            } as ServerPaths));

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockMidOrderItemView);
        });
    });
});
