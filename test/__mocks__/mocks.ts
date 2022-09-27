import { Item } from "@companieshouse/api-sdk-node/dist/services/order/order/types";
import {ItemOptions as CertificateItemOptions} from "@companieshouse/api-sdk-node/dist/services/order/certificates";
import {ViewModel} from "../../src/core/ViewModel";
import {Checkout} from "@companieshouse/api-sdk-node/dist/services/order/checkout";

export const ORDER_ID = "ORD-123456-123456";
export const CERTIFICATE_ID = "CRT-123456-123456";

export const mockCheckoutNoItems: Checkout = {
    status: "paid",
    paymentReference: "PN8h8EHBLddO94R",
    etag: "f90bd3844c44b640728be9ee70ffbda8ff5ec316",
    deliveryDetails: {
        country: "United Kingdom",
        forename: "bob",
        locality: "local",
        postalCode: "postcode",
        region: "region",
        surname: "bob",
        addressLine1: "address line 1",
        addressLine2: "address line 2",
        companyName: "company name",
        poBox: "po box"
    },
    items: [],
        kind: "order",
        totalOrderCost: "45",
        reference: "ORD-123456-123456",
        paidAt: "2020-08-28T11:43:36.817",
        checkedOutBy: {
            email: "example@email.com",
            id: "Y2VkZWVlMzhlZWFjY2M4MzQ3MT"
    },
    links: {
        self: `/checkouts/ORD-123456-123456`,
        payment: `/basket/checkouts/ORD-123456-123456/payment`
    }
}

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

export const mockMidOrderItemView: ViewModel = {
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
            emailAddress: "example@email.com",
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

export const mockCertCopyOrderItemView: ViewModel = {
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
        template: "orderItemSummary/certified_copy_item_details_component.njk"
    },
        {
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
            template: "orderItemSummary/certified_copy_document_details_component.njk"
        }],
    data: {
        title: "Summary of item CCD-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockExpressCertCopyItemView: ViewModel = {
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
        template: "orderItemSummary/certified_copy_item_details_component.njk"
    },
        {
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
            template: "orderItemSummary/certified_copy_document_details_component.njk"
        }],
    data: {
        title: "Summary of item CCD-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockCertificateItem: Item = {
    id: CERTIFICATE_ID,
    companyName: "Company Name",
    companyNumber: "00000000",
    description: "certificate for company 00000000",
    descriptionIdentifier: "certificate",
    descriptionValues: {
        certificate: "certificate for company 00000000",
        companyNumber: "00000000"
    },
    itemCosts: [{
        discountApplied: "0",
        itemCost: "15",
        calculatedCost: "15",
        productType: "certificate"
    }],
    itemOptions: {
        certificateType: "incorporation-with-all-name-changes",
        deliveryMethod: "postal",
        deliveryTimescale: "standard",
        directorDetails: {
            includeBasicInformation: true
        },
        forename: "forename",
        includeGoodStandingInformation: true,
        registeredOfficeAddressDetails: {
            includeAddressRecordsType: "current-and-previous"
        },
        secretaryDetails: {
            includeBasicInformation: true
        },
        surname: "surname",
        companyType: "ltd"
    } as CertificateItemOptions,
    etag: "abcdefg123456",
    kind: "item#certificate",
    links: {
        self: "/orderable/certificates/" + CERTIFICATE_ID
    },
    postalDelivery: true,
    quantity: 1,
    itemUri: "/orderable/certificates/" + CERTIFICATE_ID,
    status: "unknown",
    postageCost: "0",
    totalItemCost: "15",
    customerReference: "mycert",
    satisfiedAt: "2020-05-15T08:41:05.798Z"
};

export const mockDissolvedCertificateItem: Item = {
    id: CERTIFICATE_ID,
    companyName: "Company Name",
    companyNumber: "00000000",
    description: "certificate for company 00000000",
    descriptionIdentifier: "certificate",
    descriptionValues: {
        certificate: "certificate for company 00000000",
        companyNumber: "00000000"
    },
    itemCosts: [{
        discountApplied: "0",
        itemCost: "15",
        calculatedCost: "15",
        productType: "certificate"
    }],
    itemOptions: {
        certificateType: "dissolution",
        deliveryMethod: "postal",
        deliveryTimescale: "standard",
        includeEmailCopy: false,
        directorDetails: {},
        forename: "forename",
        registeredOfficeAddressDetails: {},
        secretaryDetails: {},
        surname: "surname"
    } as CertificateItemOptions,
    etag: "abcdefg123456",
    kind: "item#certificate",
    links: {
        self: "/orderable/certificates/" + CERTIFICATE_ID
    },
    postalDelivery: true,
    quantity: 1,
    itemUri: "/orderable/certificates/" + CERTIFICATE_ID,
    status: "unknown",
    postageCost: "0",
    totalItemCost: "15",
    customerReference: "mycert",
    satisfiedAt: "2020-05-15T08:41:05.798Z"
};

export const mockActiveLtdCertificateItemView: ViewModel = {
    controls: [{
        controls: [],
        data: {
            orderId: ORDER_ID,
            itemDetails: [
                {
                    key: "Item number",
                    value: CERTIFICATE_ID,
                },
                {
                    key: "Company name",
                    value: "Company Name"
                },
                {
                    key: "Company number",
                    value: "00000000"
                },
                {
                    key: "Certificate type",
                    value: "Incorporation with all company name changes"
                },
                {
                    key: "Statement of good standing",
                    value: "Yes"
                },
                {
                    key: "Registered office address",
                    value: "Current address and the one previous"
                },
                {
                    key: "The names of all current company directors",
                    value: "Yes"
                },
                {
                    key: "The names of all current secretaries",
                    value: "Yes"
                },
                {
                    key: "Company objects",
                    value: "No"
                },
                {
                    key: "Delivery method",
                    value: "Standard delivery (aim to dispatch within 10 working days)"
                },
                {
                    key: "Delivery address",
                    value: "bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom\n"
                },
                {
                    key: "Email copy required",
                    value: "Email only available for express delivery method"
                },
                {
                    key: "Email address",
                    value: "example@email.com"
                },
                {
                    key: "Fee",
                    value: "£15"
                }
            ],
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_certificate.njk"
    }],
    data: {
        title: "Summary of item CRT-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockAdministratedLtdCertificateItemView: ViewModel = {
    controls: [{
        controls: [],
        data: {
            orderId: ORDER_ID,
            itemDetails: [
                {
                    key: "Item number",
                    value: CERTIFICATE_ID,
                },
                {
                    key: "Company name",
                    value: "Company Name"
                },
                {
                    key: "Company number",
                    value: "00000000"
                },
                {
                    key: "Certificate type",
                    value: "Incorporation with all company name changes"
                },
                {
                    key: "Registered office address",
                    value: "Current address and the one previous"
                },
                {
                    key: "The names of all current company directors",
                    value:  "Yes"
                },
                {
                    key: "The names of all current secretaries",
                    value: "Yes"
                },
                {
                    key: "Company objects",
                    value: "No"
                },
                {
                    key: "Administrators' details",
                    value: "No"
                },
                {
                    key: "Delivery method",
                    value: "Standard delivery (aim to dispatch within 10 working days)"
                },
                {
                    key: "Delivery address",
                    value: "bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom\n"
                },
                {
                    key: "Email copy required",
                    value: "Email only available for express delivery method"
                },
                {
                    key: "Email address",
                    value: "example@email.com"
                },
                {
                    key: "Fee",
                    value: "£15"
                }
            ],
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_certificate.njk"
    }],
    data: {
        title: "Summary of item CRT-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockLiquidatedLtdCertificateItemView: ViewModel = {
    controls: [{
        controls: [],
        data: {
            orderId: ORDER_ID,
            itemDetails: [
                {
                    key: "Item number",
                    value: CERTIFICATE_ID,
                },
                {
                    key: "Company name",
                    value: "Company Name"
                },
                {
                    key: "Company number",
                    value: "00000000"
                },
                {
                    key: "Certificate type",
                    value: "Incorporation with all company name changes"
                },
                {
                    key: "Registered office address",
                    value: "Current address and the one previous"
                },
                {
                    key: "The names of all current company directors",
                    value:  "Yes"
                },
                {
                    key: "The names of all current secretaries",
                    value: "Yes"
                },
                {
                    key: "Company objects",
                    value: "No"
                },
                {
                    key: "Liquidators' details",
                    value: "Yes"
                },
                {
                    key: "Delivery method",
                    value: "Standard delivery (aim to dispatch within 10 working days)"
                },
                {
                    key: "Delivery address",
                    value: "bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom\n"
                },
                {
                    key: "Email copy required",
                    value: "Email only available for express delivery method"
                },
                {
                    key: "Email address",
                    value: "example@email.com"
                },
                {
                    key: "Fee",
                    value: "£15"
                }
            ],
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_certificate.njk"
    }],
    data: {
        title: "Summary of item CRT-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockDissolvedCertificateItemView: ViewModel = {
    controls: [{
        controls: [],
        data: {
            orderId: ORDER_ID,
            itemDetails:  [
                {
                    key: "Item number",
                    value: CERTIFICATE_ID,
                },
                {
                    key: "Company name",
                    value: "Company Name"
                },
                {
                    key: "Company number",
                    value: "00000000"
                },
                {
                    key: "Certificate type",
                    value: "Dissolution with all company name changes"
                },
                {
                    key: "Delivery method",
                    value: "Standard delivery (aim to dispatch within 10 working days)"
                },
                {
                    key: "Delivery address",
                    value: "bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom\n"
                },
                {
                    key: "Email copy required",
                    value: "Email only available for express delivery method"
                },
                {
                    key: "Email address",
                    value: "example@email.com"
                },
                {
                    key: "Fee",
                    value: "£15"
                }
            ],
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_certificate.njk"
    }],
    data: {
        title: "Summary of item CRT-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockActiveLLPCertificateItemView: ViewModel = {
    controls: [{
        controls: [],
        data: {
            orderId: ORDER_ID,
            itemDetails: [
                {
                    key: "Item number",
                    value: CERTIFICATE_ID,
                },
                {
                    key: "Company name",
                    value: "Company Name"
                },
                {
                    key: "Company number",
                    value: "00000000"
                },
                {
                    key: "Certificate type",
                    value: "Incorporation with all company name changes"
                },
                {
                    key: "Statement of good standing",
                    value: "Yes"
                },
                {
                    key: "Registered office address",
                    value: "Current address and the one previous"
                },
                {
                    key: "The names of all current designated members",
                    value: "Yes"
                },
                {
                    key: "The names of all current members",
                    value: "Yes"
                },
                {
                    key: "Delivery method",
                    value: "Standard delivery (aim to dispatch within 10 working days)"
                },
                {
                    key: "Delivery address",
                    value: "bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom\n"
                },
                {
                    key: "Email copy required",
                    value: "Email only available for express delivery method"
                },
                {
                    key: "Email address",
                    value: "example@email.com"
                },
                {
                    key: "Fee",
                    value: "£15"
                }
            ],
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_certificate.njk"
    }],
    data: {
        title: "Summary of item CRT-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockAdministratedLLPCertificateItemView: ViewModel = {
    controls: [{
        controls: [],
        data: {
            orderId: ORDER_ID,
            itemDetails: [
                {
                    key: "Item number",
                    value: CERTIFICATE_ID,
                },
                {
                    key: "Company name",
                    value: "Company Name"
                },
                {
                    key: "Company number",
                    value: "00000000"
                },
                {
                    key: "Certificate type",
                    value: "Incorporation with all company name changes"
                },
                {
                    key: "Registered office address",
                    value: "Current address and the one previous"
                },
                {
                    key: "The names of all current designated members",
                    value: "Including designated members':\n\nCorrespondence address\nAppointment date\nCountry of residence\nDate of birth (month and year)\n"
                },
                {
                    key: "The names of all current members",
                    value: "Including members':\n\nCorrespondence address\nAppointment date\nCountry of residence\nDate of birth (month and year)\n"
                },
                {
                    key: "Administrators' details",
                    value: "No"
                },
                {
                    key: "Delivery method",
                    value: "Standard delivery (aim to dispatch within 10 working days)"
                },
                {
                    key: "Delivery address",
                    value: "bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom\n"
                },
                {
                    key: "Email copy required",
                    value: "Email only available for express delivery method"
                },
                {
                    key: "Email address",
                    value: "example@email.com"
                },
                {
                    key: "Fee",
                    value: "£15"
                }
            ],
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_certificate.njk"
    }],
    data: {
        title: "Summary of item CRT-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockLiquidatedLLPCertificateItemView: ViewModel = {
    controls: [{
        controls: [],
        data: {
            orderId: ORDER_ID,
            itemDetails: [
                {
                    key: "Item number",
                    value: CERTIFICATE_ID,
                },
                {
                    key: "Company name",
                    value: "Company Name"
                },
                {
                    key: "Company number",
                    value: "00000000"
                },
                {
                    key: "Certificate type",
                    value: "Incorporation with all company name changes"
                },
                {
                    key: "Registered office address",
                    value: "Current address and the one previous"
                },
                {
                    key: "The names of all current designated members",
                    value: "No"
                },
                {
                    key: "The names of all current members",
                    value: "No"
                },
                {
                    key: "Liquidators' details",
                    value: "Yes"
                },
                {
                    key: "Delivery method",
                    value: "Standard delivery (aim to dispatch within 10 working days)"
                },
                {
                    key: "Delivery address",
                    value: "bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom\n"
                },
                {
                    key: "Email copy required",
                    value: "Email only available for express delivery method"
                },
                {
                    key: "Email address",
                    value: "example@email.com"
                },
                {
                    key: "Fee",
                    value: "£15"
                }
            ],
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_certificate.njk"
    }],
    data: {
        title: "Summary of item CRT-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};

export const mockActiveLPCertificateItemView: ViewModel = {
    controls: [{
        controls: [],
        data: {
            orderId: ORDER_ID,
            itemDetails: [
                {
                    key: "Item number",
                    value: CERTIFICATE_ID,
                },
                {
                    key: "Company name",
                    value: "Company Name"
                },
                {
                    key: "Company number",
                    value: "00000000"
                },
                {
                    key: "Certificate type",
                    value: "Incorporation with all company name changes"
                },
                {
                    key: "Statement of good standing",
                    value: "Yes"
                },
                {
                    key: "Principal place of business",
                    value: "Current address and the one previous"
                },
                {
                    key: "The names of all current general partners",
                    value: "Yes"
                },
                {
                    key: "The names of all current limited partners",
                    value: "Yes"
                },
                {
                    key: "General nature of business",
                    value: "Yes"
                },
                {
                    key: "Delivery method",
                    value: "Standard delivery (aim to dispatch within 10 working days)"
                },
                {
                    key: "Delivery address",
                    value: "bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom\n"
                },
                {
                    key: "Email copy required",
                    value: "Email only available for express delivery method"
                },
                {
                    key: "Email address",
                    value: "example@email.com"
                },
                {
                    key: "Fee",
                    value: "£15"
                }
            ],
            backLinkUrl: "javascript:history.back()"
        },
        template: "orderItemSummary/order_item_summary_certificate.njk"
    }],
    data: {
        title: "Summary of item CRT-123456-123456 in order ORD-123456-123456"
    },
    template: "page"
};
