import { mockCertifiedCopyItem } from "../__mocks__/order.mocks";
import { MapperRequest } from "../../src/mappers/MapperRequest";
import { CertifiedCopyMapper } from "../../src/orderitemsummary/CertifiedCopyMapper";
import { OrderItemView } from "../../src/orderitemsummary/OrderItemView";
import { Item } from "@companieshouse/api-sdk-node/dist/services/order/order";
import { GovUkOrderCertifiedCopyItemSummaryView } from "../../src/orderitemsummary/GovUkOrderCertifiedCopyItemSummaryView";

describe("CertifiedCopyMapper", () => {
    describe("map", () => {
        it("Maps a mapper request for a certified copy item to a GovUkOrderCertifiedCopyItemSummaryView with standard delivery", async () => {
            // given
            const mapper: CertifiedCopyMapper = new CertifiedCopyMapper(new MapperRequest("ORD-123123-123123", mockCertifiedCopyItem));

            // when
            mapper.map();
            const actual: OrderItemView = mapper.getMappedOrder();

            // then
            const mockCertCopyOrderItemView: GovUkOrderCertifiedCopyItemSummaryView = {
                orderDetails: {
                    orderId: "ORD-123123-123123",
                    itemId: "CCD-123456-123456",
                    itemDetails: {
                        entries: [
                            {
                                key: {
                                    classes: "govuk-!-width-one-third",
                                    text: "Company name"
                                },
                                value: {
                                    classes: "govuk-!-width-two-thirds",
                                    text: "Company Name"
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
                                    text: "Delivery method"
                                },
                                value: {
                                    classes: "govuk-!-width-two-thirds",
                                    text: "Standard delivery (aim to dispatch within 10 working days)"
                                }
                            }
                        ]
                    },
                    backLinkUrl: "/orders/ORD-123123-123123"
                },
                documentDetails: [
                    [
                        {
                            text: "12 Feb 2010"
                        },
                        {
                            text: "CH01"
                        },
                        {
                            text: "Director's details changed for Thomas David Wheare on 12 February 2010"
                        },
                        {
                            text: "£15"
                        }
                    ]
                ]
            };
            expect(actual.data).toEqual(mockCertCopyOrderItemView);
            expect(actual.template).toEqual("order-item-summary-ccd");
        });

        it("Maps a mapper request for a certified copy item to a GovUkOrderCertifiedCopyItemSummaryView with standard delivery", async () => {
            // given
            const expressDeliveryCertCopy: Item = {
                ...mockCertifiedCopyItem,
                itemOptions: {
                    ...mockCertifiedCopyItem.itemOptions,
                    deliveryTimescale: "same-day",
                }
            };
            const mapper: CertifiedCopyMapper = new CertifiedCopyMapper(new MapperRequest("ORD-123123-123123", expressDeliveryCertCopy));

            // when
            mapper.map();
            const actual: OrderItemView = mapper.getMappedOrder();

            // then
            const mockCertCopyOrderExpressItemView: GovUkOrderCertifiedCopyItemSummaryView = {
                orderDetails: {
                    orderId: "ORD-123123-123123",
                    itemId: "CCD-123456-123456",
                    itemDetails: {
                        entries: [
                            {
                                key: {
                                    classes: "govuk-!-width-one-third",
                                    text: "Company name"
                                },
                                value: {
                                    classes: "govuk-!-width-two-thirds",
                                    text: "Company Name"
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
                                    text: "Delivery method"
                                },
                                value: {
                                    classes: "govuk-!-width-two-thirds",
                                    text: "Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day)"
                                }
                            }
                        ]
                    },
                    backLinkUrl: "/orders/ORD-123123-123123"
                },
                documentDetails: [
                    [
                        {
                            text: "12 Feb 2010"
                        },
                        {
                            text: "CH01"
                        },
                        {
                            text: "Director's details changed for Thomas David Wheare on 12 February 2010"
                        },
                        {
                            text: "£15"
                        }
                    ]
                ]
            };
            expect(actual.data).toEqual(mockCertCopyOrderExpressItemView);
            expect(actual.template).toEqual("order-item-summary-ccd");
        });
    });
});
