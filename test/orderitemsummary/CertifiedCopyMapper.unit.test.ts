import { mockCertifiedCopyItem, mockCertCopyOrderItemView } from "../__mocks__/mocks";
import { MapperRequest } from "../../src/mappers/MapperRequest";
import { CertifiedCopyMapper } from "../../src/orderitemsummary/CertifiedCopyMapper";
import { Item } from "@companieshouse/api-sdk-node/dist/services/order/order";

describe("CertifiedCopyMapper", () => {
    describe("map", () => {
        it("Maps a mapper request for a certified copy item to a CertifiedCopyDetailsComponent with standard delivery", async () => {
            // given
            const mapper: CertifiedCopyMapper = new CertifiedCopyMapper(new MapperRequest("ORD-123456-123456", mockCertifiedCopyItem));

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
            const mapper: CertifiedCopyMapper = new CertifiedCopyMapper(new MapperRequest("ORD-123456-123456", expressCertCopyItem));

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            const expressCertCopyItemView = {
                controls: [{
                    controls: [],
                    data: {
                        orderId: "ORD-123456-123456",
                        itemId: "CCD-123456-123456",
                        companyName: "Company Name",
                        companyNumber: "00000000",
                        deliveryMethod: "Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day)",
                        dateFiled: "12 Feb 2010",
                        type: "CH01",
                        description: "Director's details changed for Thomas David Wheare on 12 February 2010",
                        fee: "£50",
                        backLinkUrl: "javascript:history.back()"
                    },
                    template: "orderItemSummary/order_item_summary_ccd.njk"
                }],
                data: {
                    title: "Summary of item CCD-123456-123456 in order ORD-123456-123456"
                },
                template: "page"
            };
            expect(actual).toEqual(expressCertCopyItemView);
        });
    });
});
