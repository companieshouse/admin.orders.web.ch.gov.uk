import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import { Status } from "../../src/core/Status";
import { Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { OrderDetails } from "../../src/orderdetails/OrderDetails";
import { LPOrderDetailsMapper } from "../../src/orderdetails/LPOrderDetailsMapper";

describe("LPOrderDetailsMapper", () => {
    it("Maps a successful response for limited-partnership company details", () => {
        // given
        const serverResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                paidAt: "sometime",
                paymentReference: "somereference",
                etag: "133c845078fc928fc38d409b9ffd732b2356f594",
                deliveryDetails: {
                    poBox: "poBox",
                    country: "UK",
                    forename: "John",
                    locality: "Cardiff",
                    postalCode: "CF14 3UZ",
                    region: "Cardiff",
                    surname: "Test",
                    addressLine1: "1 Crown Way",
                    addressLine2: "Maindy"
                },
                items: [
                    {
                        id: "CRT-102416-028334",
                        companyName: "TestDefault",
                        companyNumber: "TT000056",
                        description: "certificate for company TT000056",
                        descriptionIdentifier: "certificate",
                        descriptionValues: {
                            certificate: "certificate for company TT000056",
                            companyNumber: "TT000056"
                        },
                        itemCosts: [
                            {
                                discountApplied: "0",
                                itemCost: "15",
                                calculatedCost: "15",
                                productType: "certificate"
                            }
                        ],
                        itemOptions: {
                            companyStatus: "active",
                            companyType: "limited-partnership",
                            deliveryMethod: "postal",
                            deliveryTimescale: "same-day",
                            includeEmailCopy: true,
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            generalPartnerDetails: {
                                includeBasicInformation: true,
                            },
                            includeGoodStandingInformation: true,
                            principalPlaceOfBusinessDetails: {
                                includeAddressRecordsType: "current"
                            },
                            limitedPartnerDetails: {
                                includeBasicInformation: true,
                            },
                            includeGeneralNatureOfBusinessInformation: true
                        },
                        etag: "21ecbbf3391cf856155393cc3d4a737d9a3c233a",
                        kind: "item#certificate",
                        links: {
                            self: "/orderable/certificates/CRT-102416-028334"
                        },
                        quantity: 1,
                        itemUri: "/orderable/certificates/CRT-102416-028334",
                        status: "unknown",
                        postageCost: "0",
                        totalItemCost: "15",
                        postalDelivery: true
                    }
                ],
                kind: "order",
                totalOrderCost: "15",
                reference: "ORD-957216-028332",
                checkedOutBy: {
                    email: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    id: "zXUYdFHZPxwoUcWVEWaoGJkEAfK"
                },
                status: "paid",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new LPOrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            model: {
                certificateDetails: {
                    orderNumber: "ORD-957216-028332",
                    orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    companyName: "TestDefault",
                    companyNumber: "TT000056",
                    certificateType: "Incorporation with all company name changes",
                    statementOfGoodStanding: "Yes",
                    principalPlaceOfBusiness: "Current address",
                    generalPartners: "Yes",
                    limitedPartners: "Yes",
                    generalNatureOfBusiness: "Yes",
                    isNotDissolution: true
                },
                deliveryInfo: {
                    deliveryMethod: "Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day)",
                    deliveryDetails: "John Test\n1 Crown Way\nMaindy\nCardiff\nCardiff\nCF14 3UZ\nUK\n",
                    emailCopyRequired: "Yes"
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });

    it("Maps a successful response for limited-partnership company details with no values", () => {
        // given
        const serverResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                paidAt: "sometime",
                paymentReference: "somereference",
                etag: "133c845078fc928fc38d409b9ffd732b2356f594",
                deliveryDetails: {
                    poBox: "poBox",
                    country: "UK",
                    forename: "John",
                    locality: "Cardiff",
                    postalCode: "CF14 3UZ",
                    region: "Cardiff",
                    surname: "Test",
                    addressLine1: "1 Crown Way",
                    addressLine2: "Maindy"
                },
                items: [
                    {
                        id: "CRT-102416-028334",
                        companyName: "TestDefault",
                        companyNumber: "TT000056",
                        description: "certificate for company TT000056",
                        descriptionIdentifier: "certificate",
                        descriptionValues: {
                            certificate: "certificate for company TT000056",
                            companyNumber: "TT000056"
                        },
                        itemCosts: [
                            {
                                discountApplied: "0",
                                itemCost: "15",
                                calculatedCost: "15",
                                productType: "certificate"
                            }
                        ],
                        itemOptions: {
                            companyStatus: "active",
                            companyType: "limited-partnership",
                            deliveryMethod: "postal",
                            deliveryTimescale: "standard",
                            includeEmailCopy: false,
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            principalPlaceOfBusinessDetails: {
                                includeAddressRecordsType: "current"
                            },
                            generalPartnerDetails: {},
                            limitedPartnerDetails: {}
                        },
                        etag: "21ecbbf3391cf856155393cc3d4a737d9a3c233a",
                        kind: "item#certificate",
                        links: {
                            self: "/orderable/certificates/CRT-102416-028334"
                        },
                        quantity: 1,
                        itemUri: "/orderable/certificates/CRT-102416-028334",
                        status: "unknown",
                        postageCost: "0",
                        totalItemCost: "15",
                        postalDelivery: true
                    }
                ],
                kind: "order",
                totalOrderCost: "15",
                reference: "ORD-957216-028332",
                checkedOutBy: {
                    email: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    id: "zXUYdFHZPxwoUcWVEWaoGJkEAfK"
                },
                status: "paid",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new LPOrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            model: {
                certificateDetails: {
                    orderNumber: "ORD-957216-028332",
                    orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    companyName: "TestDefault",
                    companyNumber: "TT000056",
                    certificateType: "Incorporation with all company name changes",
                    statementOfGoodStanding: "No",
                    principalPlaceOfBusiness: "Current address",
                    generalPartners: "No",
                    limitedPartners: "No",
                    generalNatureOfBusiness: "No",
                    isNotDissolution: true
                },
                deliveryInfo: {
                    deliveryMethod: "Standard delivery (aim to dispatch within 10 working days)",
                    deliveryDetails: "John Test\n1 Crown Way\nMaindy\nCardiff\nCardiff\nCF14 3UZ\nUK\n",
                    emailCopyRequired: "Email only available for express delivery method"
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });
});
