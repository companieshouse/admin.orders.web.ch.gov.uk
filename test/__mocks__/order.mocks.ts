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

export const mockMidOrderItemView = {
    controls: [{
        controls: [],
        data: {
            orderId: "ORD-123456-123456",
            itemId: "MID-123456-123456",
            companyName: "The Company",
            companyNumber: "00000000",
            date: "26 May 2015",
            type: "AP01",
            description: "Appointment of Mr Richard John Harris as a director",
            fee: "£3",
            backLinkUrl: "/orders-admin/order-summaries/ORD-123456-123456"
        },
        template: "orderItemSummary/order-item-summary-mid.njk"
    }],
    data: {
        title: "Summary of item MID-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};
