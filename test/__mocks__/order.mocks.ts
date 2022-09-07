import { Item } from "@companieshouse/api-sdk-node/dist/services/order/order/types";
import {GovUkOrderItemSummaryView} from "../../src/orderitemsummary/GovUkOrderItemSummaryView";

export const mockMissingImageDeliveryItem: Item = {
    id: "MID-123456-123456",
    companyName: "The Company",
    companyNumber: "00000000",
    description: "missing image delivery for company 00000000",
    descriptionIdentifier: "missing-image-delivery",
    descriptionValues: {
        company_number: "00000000",
        "missing-image-delivery": "missing image delivery for company 00000000"
    },
    itemCosts: [
        {
            discountApplied: "0",
            itemCost: "3",
            calculatedCost: "3",
            productType: "missing-image-delivery"
        }
    ],
    itemOptions: {
        filingHistoryBarcode: "barcode",
        filingHistoryCategory: "category",
        filingHistoryCost: "cost",
        filingHistoryDate: "2015-05-26",
        filingHistoryDescription: "appoint-person-director-company-with-name",
        filingHistoryDescriptionValues: {
            officer_name: "Mr Richard John Harris"
        },
        filingHistoryId: "MzEyMzcyNDc2OWFkaXF6a2N4",
        filingHistoryType: "AP01"
    },
    etag: "7ae7d006fab4a6bab9fafcfea1eef1b78ffa4e52",
    kind: "item#missing-image-delivery",
    links: {
        self: "/orderable/missing-image-deliveries/MID-123456-123456"
    },
    quantity: 1,
    itemUri: "/orderable/missing-image-deliveries/MID-123456-123456",
    status: "unknown",
    postageCost: "0",
    totalItemCost: "3",
    postalDelivery: false
};

export const mockMidOrderItemView: GovUkOrderItemSummaryView = {
    orderId: "ORD-123456-123456",
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
    backLinkUrl: "/orders/ORD-123456-123456"
};
