import { Item } from "@companieshouse/api-sdk-node/dist/services/order/order/types";

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
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_mid.njk"
    }],
    data: {
        title: "Summary of item MID-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockCertifiedCopyItem: Item = {
    id: "CCD-123456-123456",
    companyName: "Company Name",
    companyNumber: "00000000",
    description: "certified-copy for company 00000000",
    descriptionIdentifier: "certified-copy",
    descriptionValues: {
        certificate: "certified-copy for company 00000000",
        companyNumber: "00000000"
    },
    itemCosts: [{
        discountApplied: "0",
        itemCost: "30",
        calculatedCost: "30",
        productType: "certified-copy"
    }],
    itemOptions: {
        collectionLocation: "cardiff",
        contactNumber: "0123456789",
        deliveryMethod: "postal",
        deliveryTimescale: "standard",
        filingHistoryDocuments: [{
            filingHistoryDate: "2010-02-12",
            filingHistoryDescription: "change-person-director-company-with-change-date",
            filingHistoryDescriptionValues: {
                change_date: "2010-02-12",
                officer_name: "Thomas David Wheare"
            },
            filingHistoryId: "MzAwOTM2MDg5OWFkaXF6a2N4",
            filingHistoryType: "CH01",
            filingHistoryCost: "15"
        }],
        forename: "forename",
        surname: "surname"
    },
    etag: "abcdefg123456",
    kind: "item#certified-copy",
    links: {
        self: "/orderable/certified-copies/CCD-123456-123456"
    },
    postalDelivery: true,
    quantity: 1,
    itemUri: "/orderable/certified-copies/CCD-123456-123456",
    status: "unknown",
    postageCost: "0",
    totalItemCost: "15",
    customerReference: "mycert",
    satisfiedAt: "2020-05-15T08:41:05.798Z"
};

export const mockCertCopyOrderItemView = {
    controls: [{
        controls: [],
        data: {
            orderId: "ORD-123456-123456",
            itemId: "CCD-123456-123456",
            companyName: "Company Name",
            companyNumber: "00000000",
            deliveryMethod: "Standard delivery (aim to dispatch within 10 working days)",
            dateFiled: "12 Feb 2010",
            type: "CH01",
            description: "Director's details changed for Thomas David Wheare on 12 February 2010",
            fee: "£15",
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_ccd.njk"
    }],
    data: {
        title: "Summary of item CCD-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};
