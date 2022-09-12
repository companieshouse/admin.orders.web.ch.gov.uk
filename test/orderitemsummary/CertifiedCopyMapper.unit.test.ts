import { mockCertifiedCopyItem, mockCertCopyOrderItemView, mockExpressCertCopyItemView } from "../__mocks__/mocks";
import { MapperRequest } from "../../src/mappers/MapperRequest";
import { CertifiedCopyMapper } from "../../src/orderitemsummary/CertifiedCopyMapper";
import { Item } from "@companieshouse/api-sdk-node/dist/services/order/order";
import {FilingHistoryMapper} from "../../src/mappers/FilingHistoryMapper";
import {ServerPaths} from "../../src/application/ServerPaths";

const filingHistoryMapper = new FilingHistoryMapper({
    applicationRootDir: "."
} as ServerPaths);

describe("CertifiedCopyMapper", () => {
    describe("map", () => {
        it("Maps a mapper request for a certified copy item to a CertifiedCopyDetailsComponent with standard delivery", async () => {
            // given
            const mapper: CertifiedCopyMapper = new CertifiedCopyMapper(new MapperRequest("ORD-123456-123456", mockCertifiedCopyItem), filingHistoryMapper);

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockCertCopyOrderItemView);
        });

        it("Maps a mapper request for a certified copy item to a CertifiedCopyDetailsComponent with express delivery", async () => {
            // given
            const expressCertCopyItem: Item = {
                ...mockCertifiedCopyItem,
                itemOptions: {
                    ...mockCertifiedCopyItem.itemOptions,
                    deliveryTimescale: "same-day",
                },
                totalItemCost: "50"
            };
            const mapper: CertifiedCopyMapper = new CertifiedCopyMapper(new MapperRequest("ORD-123456-123456", expressCertCopyItem), filingHistoryMapper);

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockExpressCertCopyItemView);
        });
    });
});
