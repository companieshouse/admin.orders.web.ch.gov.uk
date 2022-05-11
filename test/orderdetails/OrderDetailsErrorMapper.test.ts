import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import {Checkout} from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import {Status} from "../../src/core/Status";
import {OrderDetailsErrorMapper} from "../../dist/orderdetails/OrderDetailsErrorMapper";

describe("OrderDetailsErrorMapper", () => {
    it("Maps a non-HTTP 404 Not Found error to a server error response", () => {
        // given
        const serverResponse = new Failure<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 401,
            errors: [{
                error: "Something went wrong",
            }, {
                error: "Something else went wrong"
            }]
        });
        const mapper = new OrderDetailsErrorMapper();

        // when
        const actual = mapper.map(serverResponse);

        // then
        expect(actual).toEqual({
            status: Status.SERVER_ERROR
        });
    });

    it("Maps a client error response when wrong item kind", () => {
        // given
        const serverResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                paidAt: "sometime",
                paymentReference: "somereference",
                checkedOutBy : {
                    id : "LLBdFxTUqSouJOKeflzCOuyguZq",
                    email : "testautomation61@companieshouse.gov.uk; forename=Test; surname=User"
                },
                status : "cancelled",
                links : {
                    payment : "/basket/checkouts/ORD-769316-028358/payment",
                    self : "/basket/checkouts/ORD-769316-028358"
                },
                etag : "2c6d694c2eeab42edad57caa8dd2f2d67554c2df",
                deliveryDetails: {
                    poBox: "poBox",
                    country: "UK",
                    forename: "John",
                    locality: "Cardiff",
                    postalCode: "CFA1 XUZ",
                    region: "Cardiff",
                    surname: "Test",
                    addressLine1: "1 Test Way",
                    addressLine2: "Fakedy"
                },
                items : [
                    {
                        id : "CCD-949716-028358",
                        companyName : "CERTIFIED DOCUMENTS TEST COMPANY LIMITED",
                        companyNumber : "10371283",
                        description : "certified copy for company 10371283",

                        descriptionIdentifier : "certified-copy",
                        descriptionValues : {
                            companyNumber : "10371283",
                            certifiedCopy : "certified copy for company 10371283",
                        },
                        itemCosts : [
                            {
                                discountApplied : "0",
                                itemCost : "15",
                                calculatedCost : "15",
                                productType : "certified-copy"
                            }
                        ],
                        itemOptions : {
                            filingHistoryDocuments : [
                                {
                                    filingHistoryDate : "2019-11-23",
                                    filingHistoryDescription : "capital-allotment-shares",
                                    filingHistoryDescriptionValues : {
                                        date : "2019-11-10",
                                        capital : [
                                            {
                                                figure : "34,253,377",
                                                currency : "GBP"
                                            }
                                        ]
                                    },
                                    filingHistoryId : "OTAwMzQ1NjM2M2FkaXF6a6N4",
                                    filingHistoryType : "SH01",
                                    filingHistoryCost : "15"
                                }
                            ],
                            deliveryMethod : "postal",
                            deliveryTimescale : "standard"
                        },
                        etag : "e9869125e3a1ad5d7a16f472d7175f17d0542fd6",
                        kind : "item#certified-copy",
                        links : {
                            self : "/orderable/certified-copies/CCD-949716-028358"
                        },
                        postalDelivery : true,
                        quantity : 1,
                        itemUri : "/orderable/certified-copies/CCD-949716-028358",
                        status : "unknown",
                        postageCost : "0",
                        totalItemCost : "15"
                    }
                ],
                kind : "order",
                totalOrderCost : "15",
                reference : "ORD-769316-028358"
            }
        });
        const mapper = new OrderDetailsErrorMapper();

        // when
        const actual = mapper.map(serverResponse);

        // then
        expect(actual).toEqual({
            status: Status.CLIENT_ERROR
        });
    });


    it("Maps a not found error response to client error", () => {
        // given
        const serverResponse = new Failure<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 404,
            errors: [{
                error: "Something went wrong",
            }, {
                error: "Something else went wrong"
            }]
        });
        const mapper = new OrderDetailsErrorMapper();

        // when
        const actual = mapper.map(serverResponse);

        // then
        expect(actual).toEqual({
            status: Status.CLIENT_ERROR
        });
    });

    it("Throws an error if successful response mapped", () => {
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
                                includeBasicInformation: true,
                                includeAddress: false,
                                includeAppointmentDate: false
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
        const mapper = new OrderDetailsErrorMapper();

        // when
        const execution = () => mapper.map(serverResponse);

        // then
        expect(execution).toThrowError();
    });
});
