import {PageFactory} from "../../src/order_summary/PageFactory";
import {GlobalPageFactory} from "../../src/core/GlobalPageFactory";
import {OrderSummary} from "../../src/order_summary/OrderSummary";

describe("PageFactory", () => {
    describe("buildOrderSummaryPage", () => {
        it("Constructs a view model for an order with deliverable items", () => {
            // given
            const pageFactory = new PageFactory(new GlobalPageFactory());
            const orderSummary: OrderSummary = {
                orderReference: "ORD-123123-123123",
                itemSummary: [{
                    id: "CRT-123123-123123"
                }],
                hasDeliverableItems: true,
                deliveryDetails: {
                    deliveryAddress: "address"
                },
                paymentDetails: {
                    paymentReference: "payment_reference",
                    amountPaid: "£15"
                }
            };

            // when
            const actual = pageFactory.buildOrderSummaryPage(orderSummary);

            // then
            expect(actual).toEqual({
                template: "page",
                controls: [
                    {
                        template: "orderSummary/order_summary.njk",
                        controls: [{
                            template: "orderSummary/item_details.njk",
                            controls: [],
                            data: {
                                id: "CRT-123123-123123"
                            }
                        }],
                        data: orderSummary
                    },
                    {
                        template: "orderSummary/delivery_details.njk",
                        controls: [],
                        data: {
                            deliveryAddress: "address"
                        }
                    },
                    {
                        template: "orderSummary/payment_details.njk",
                        controls: [],
                        data: {
                            paymentReference: "payment_reference",
                            amountPaid: "£15"
                        }
                    }],
                data: {
                    title: "Order Details"
                }
            });
        });

        it("Constructs a view model for an order with no deliverable items", () => {
            // given
            const pageFactory = new PageFactory(new GlobalPageFactory());
            const orderSummary: OrderSummary = {
                orderReference: "ORD-123123-123123",
                itemSummary: [{
                    id: "CRT-123123-123123"
                }],
                hasDeliverableItems: false,
                deliveryDetails: {
                    deliveryAddress: "address"
                },
                paymentDetails: {
                    paymentReference: "payment_reference",
                    amountPaid: "£15"
                }
            };

            // when
            const actual = pageFactory.buildOrderSummaryPage(orderSummary);

            // then
            expect(actual).toEqual({
                template: "page",
                controls: [
                    {
                        template: "orderSummary/order_summary.njk",
                        controls: [{
                            template: "orderSummary/item_details.njk",
                            controls: [],
                            data: {
                                id: "CRT-123123-123123"
                            }
                        }],
                        data: orderSummary
                    },
                    {
                        template: "orderSummary/payment_details.njk",
                        controls: [],
                        data: {
                            paymentReference: "payment_reference",
                            amountPaid: "£15"
                        }
                    }],
                data: {
                    title: "Order Details"
                }
            });
        });
    });
});
