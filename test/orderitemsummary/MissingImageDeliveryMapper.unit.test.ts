import { MissingImageDeliveryMapper } from "../../src/orderitemsummary/MissingImageDeliveryMapper";
import { OrderItemView } from "../../src/orderitemsummary/OrderItemView";
import { expect } from "chai";
import { MapperRequest } from "../../src/mappers/MapperRequest";
import { GovUkOrderItemSummaryView } from "../../src/orderitemsummary/GovUkOrderItemSummaryView";
import { mockMissingImageDeliveryItem } from "../__mocks__/order.mocks";

describe("MissingImageDeliveryMapper", () => {
    describe("map", () => {
        it("Maps a mapper request for a missing image delivery item to a GovUkOrderItemSummaryView", async () => {
            // given
            const mapper: MissingImageDeliveryMapper = new MissingImageDeliveryMapper(new MapperRequest("ORD-123123-123123", mockMissingImageDeliveryItem));

            // when
            mapper.map();
            const actual: OrderItemView = mapper.getMappedOrder();

            // then
            const mockMidOrderItemView: GovUkOrderItemSummaryView = {
                orderId: "ORD-123123-123123",
                itemId: "MID-123456-123456",
                itemDetails: {
                    entries: [
                        {
                            key: {
                                classes: "govuk-!-width-one-third",
                                text: "Company name"
                            },
                            value: {
                                classes: "govuk-!-width-two-thirds",
                                text: "The Company"
                            }
                        },
                        {
                            key: {
                                classes: "govuk-!-width-one-third",
                                text: "Company number"
                            },
                            value: {
                                classes: "govuk-!-width-two-thirds",
                                text: "00000000"
                            }
                        },
                        {
                            key: {
                                classes: "govuk-!-width-one-third",
                                text: "Date"
                            },
                            value: {
                                classes: "govuk-!-width-two-thirds",
                                text: "26 May 2015"
                            }
                        },
                        {
                            key: {
                                classes: "govuk-!-width-one-third",
                                text: "Type"
                            },
                            value: {
                                classes: "govuk-!-width-two-thirds",
                                text: "AP01"
                            }
                        },
                        {
                            key: {
                                classes: "govuk-!-width-one-third",
                                text: "Description"
                            },
                            value: {
                                classes: "govuk-!-width-two-thirds",
                                text: "Appointment of Mr Richard John Harris as a director"
                            }
                        },
                        {
                            key: {
                                classes: "govuk-!-width-one-third",
                                text: "Fee"
                            },
                            value: {
                                classes: "govuk-!-width-two-thirds",
                                text: "£3"
                            }
                        }
                    ]
                },
                backLinkUrl: "/orders/ORD-123123-123123"
            };
            expect(actual.data).to.deep.equal(mockMidOrderItemView);
            expect(actual.template).to.equal("order-item-summary-mid");
        });
    });
});
