import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import { Status } from "../../src/core/Status";
import { Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { OrderDetailsMapper } from "../../src/orderdetails/OrderDetailsMapper";
import { OrderDetails } from "../../src/orderdetails/OrderDetails";

describe("OrderDetailsMapper", () => {
    it("Maps a successful response for default company details", () => {
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
                            companyType: "plc",
                            deliveryMethod: "postal",
                            deliveryTimescale: "standard",
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            directorDetails: {
                                includeBasicInformation: true,
                                includeOccupation: true,
                                includeNationality: true
                            },
                            includeCompanyObjectsInformation: true,
                            includeGoodStandingInformation: true,
                            registeredOfficeAddressDetails: {
                                includeAddressRecordsType: "current"
                            },
                            secretaryDetails: {
                                includeBasicInformation: true
                            }
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
                status: "failed",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new OrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        console.log(result)
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
                    registeredOfficeAddress: "Current address",
                    directors: "Including directors':<br><br>Occupation<br>Nationality<br>",
                    secretaries: "Yes",
                    companyObjects: "Yes"
                },
                deliveryInfo: {
                    deliveryMethod: "Standard delivery (aim to dispatch within 10 working days)",
                    deliveryDetails: "John Test<br>1 Crown Way<br>Maindy<br>Cardiff<br>Cardiff<br>CF14 3UZ<br>UK<br>",
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });

    it("Maps a successful response for LLP company details", () => {
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
                            companyType: "llp",
                            deliveryMethod: "postal",
                            deliveryTimescale: "standard",
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            designatedMemberDetails: {
                                includeBasicInformation: true,
                                includeAppointmentDate: true
                            },
                            includeGoodStandingInformation: true,
                            registeredOfficeAddressDetails: {
                                includeAddressRecordsType: "current"
                            },
                            memberDetails: {
                            }
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
                status: "failed",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new OrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        console.log(result)
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
                    registeredOfficeAddress: "Current address",
                    designatedMembers: "Including designated members':<br><br>Appointment date<br>",
                },
                deliveryInfo: {
                    deliveryMethod: "Standard delivery (aim to dispatch within 10 working days)",
                    deliveryDetails: "John Test<br>1 Crown Way<br>Maindy<br>Cardiff<br>Cardiff<br>CF14 3UZ<br>UK<br>",
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });

    it("Maps a successful response for limited partnership company details", () => {
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
                            companyType: "limited partnerhship",
                            deliveryMethod: "postal",
                            deliveryTimescale: "standard",
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            includeGoodStandingInformation: true,
                            principalPlaceOfBusinessDetails: {
                                includeAddressRecordsType: "current"
                            },
                            generalPartnerDetails: {
                                includeBasicInformation: true
                            }
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
                status: "failed",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new OrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        console.log(result)
        // then
        expect(result).toEqual({
            status: "SUCCESS",
            model:  {
                certificateDetails: {
                    orderNumber: "ORD-957216-028332",
                    orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    companyName: "TestDefault",
                    companyNumber: "TT000056",
                    certificateType: "Incorporation with all company name changes",
                    statementOfGoodStanding: "Yes",
                    principalPlaceOfBusiness: "Current address",
                    generalPartners: "Yes",
                },
                deliveryInfo: {
                    deliveryMethod: "Standard delivery (aim to dispatch within 10 working days)",
                    deliveryDetails: "John Test<br>1 Crown Way<br>Maindy<br>Cardiff<br>Cardiff<br>CF14 3UZ<br>UK<br>",
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });

    it("Maps an error response", () => {
        // given
        const serverResponse = new Failure<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 401,
            errors: [{
                error: "Something went wrong",
            }, {
                error: "Something else went wrong"
            }]
        });
        const mapper = new OrderDetailsMapper();

        // when
        const actual = mapper.map(serverResponse);

        // then
        expect(actual).toEqual({
            status: Status.SERVER_ERROR
        });
    });
});
