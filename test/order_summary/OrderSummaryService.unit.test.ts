import {OrderSummaryResult, OrderSummaryService} from "../../src/order_summary/OrderSummaryService";
import { expect } from "chai";
import { OrderSummary } from "../../src/order_summary/OrderSummary";
import {StubApiClientFactory} from "../../src/client/StubApiClientFactory";
import checkoutResource from "../__stub__/checkout_with_all_item_combos.json";
import checkoutNoDeliverables from "../__stub__/checkout_with_no_deliverable_items.json";
import {Status} from "../../src/core/Status";

describe("OrderSummaryService", () => {
    describe("fetchOrderSummary", () => {
        it("Returns a mapped order summary object", async () => {
            // given
            const apiClientFactory = new StubApiClientFactory();
            apiClientFactory.willReturnSuccessfulCheckoutResponse(checkoutResource);
            const service = new OrderSummaryService(apiClientFactory);

            // when
            const actual = await service.fetchOrderSummary("ORD-123123-123123", "F00DFACE");

            // then
            expect(actual).to.deep.equal(new OrderSummaryResult(Status.SUCCESS, {
                backLinkUrl: "javascript:history.back()",
                orderReference: "ORD-123123-123123",
                deliveryDetails: {
                    deliveryAddress: "Forename Surname\nAddress line 1\nAddress line 2\nLocality\nRegion\nPostcode\nCountry\n"
                },
                paymentDetails: {
                    paymentStatus: "Paid",
                    paymentReference: "payment_reference",
                    amountPaid: "£133"
                },
                hasDeliverableItems: true,
                itemSummary: [
                    {
                        id: "MID-123123-123123",
                        orderType: "Missing image",
                        companyNumber: "12345678",
                        deliveryMethod: "N/A",
                        quantity: 1,
                        fee: "£3",
                        itemLink: "/orders-admin/order-summaries/ORD-123123-123123/items/MID-123123-123123"
                    },
                    {
                        id: "CRT-123123-123123",
                        orderType: "Certificate",
                        companyNumber: "12345678",
                        deliveryMethod: "Standard",
                        quantity: 1,
                        fee: "£15",
                        itemLink: "/orders-admin/order-summaries/ORD-123123-123123/items/CRT-123123-123123"
                    },
                    {
                        id: "CRT-123123-123124",
                        orderType: "Certificate",
                        companyNumber: "12345679",
                        deliveryMethod: "Express",
                        quantity: 1,
                        fee: "£50",
                        itemLink: "/orders-admin/order-summaries/ORD-123123-123123/items/CRT-123123-123124"
                    },
                    {
                        id: "CCD-123123-123123",
                        orderType: "Certified document",
                        companyNumber: "12345678",
                        deliveryMethod: "Standard",
                        quantity: 1,
                        fee: "£15",
                        itemLink: "/orders-admin/order-summaries/ORD-123123-123123/items/CCD-123123-123123"
                    },
                    {
                        id: "CCD-123123-123124",
                        orderType: "Certified document",
                        companyNumber: "12345670",
                        deliveryMethod: "Express",
                        quantity: 1,
                        fee: "£50",
                        itemLink: "/orders-admin/order-summaries/ORD-123123-123123/items/CCD-123123-123124"
                    }
                ]
            } as OrderSummary));
        });

        it("Hides delivery details if no deliverable items ordered", async () => {
            // given
            const apiClientFactory = new StubApiClientFactory();
            apiClientFactory.willReturnSuccessfulCheckoutResponse(checkoutNoDeliverables);
            const service = new OrderSummaryService(apiClientFactory);

            // when
            const actual = await service.fetchOrderSummary("ORD-123123-123123", "F00DFACE");

            // then
            expect(actual).to.deep.equal(new OrderSummaryResult(Status.SUCCESS, {
                backLinkUrl: "javascript:history.back()",
                orderReference: "ORD-123123-123123",
                deliveryDetails: {
                    deliveryAddress: "Forename Surname\nAddress line 1\nAddress line 2\nLocality\nRegion\nPostcode\nCountry\n"
                },
                paymentDetails: {
                    paymentStatus: "Paid",
                    paymentReference: "payment_reference",
                    amountPaid: "£3"
                },
                hasDeliverableItems: false,
                itemSummary: [
                    {
                        id: "MID-123123-123123",
                        orderType: "Missing image",
                        companyNumber: "12345678",
                        deliveryMethod: "N/A",
                        quantity: 1,
                        fee: "£3",
                        itemLink: "/orders-admin/order-summaries/ORD-123123-123123/items/MID-123123-123123"
                    }
                ]
            } as OrderSummary));
        });
    });
});
