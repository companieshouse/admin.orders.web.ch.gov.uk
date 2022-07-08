import {StubApiClientFactory} from "../../src/client/StubApiClientFactory";
import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import {SearchResponse} from "@companieshouse/api-sdk-node/dist/services/order/search";
import {Checkout} from "@companieshouse/api-sdk-node/dist/services/order/checkout";

describe("StubApiClientFactory", () => {
    it("Stubs a successful search response", async () => {
        // given
        const factory = new StubApiClientFactory();
        const expectedResponse = {
            "greeting": "hello"
        };

        factory.willReturnSuccessfulSearchResponse(expectedResponse);
        const client = factory.newApiClient("F00DFACE");

        // when
        const result = await client.checkoutSearchService.search({pageSize: 1000}) as Success<ApiResponse<SearchResponse>, ApiErrorResponse>;

        // then
        expect(result.isFailure()).toEqual(false);
        expect(result.isSuccess()).toEqual(true);
        expect(result.value.httpStatusCode).toEqual(200);
        expect(result.value.resource).toEqual(expectedResponse);
    });

    it("Stubs an error search response", async () => {
        // given
        const factory = new StubApiClientFactory();
        const expectedResponse = {
            "greeting": "hello"
        };

        factory.willReturnErrorSearchResponse(400, expectedResponse);
        const client = factory.newApiClient("F00DFACE");

        // when
        const result = await client.checkoutSearchService.search({pageSize: 1000}) as Failure<ApiResponse<SearchResponse>, ApiErrorResponse>;

        // then
        expect(result.isFailure()).toEqual(true);
        expect(result.isSuccess()).toEqual(false);
        expect(result.value.httpStatusCode).toEqual(400);
        expect(result.value.errors).toEqual(expectedResponse);
    });

    it("Returns a default search response if no stubbing performed", async () => {
        // given
        const factory = new StubApiClientFactory();
        const client = factory.newApiClient("F00DFACE");

        // when
        const result = await client.checkoutSearchService.search({pageSize: 1000}) as Success<ApiResponse<SearchResponse>, ApiErrorResponse>;

        // then
        expect(result.isFailure()).toEqual(false);
        expect(result.isSuccess()).toEqual(true);
        expect(result.value.httpStatusCode).toEqual(200);
        expect(result.value.resource).toEqual({
            totalOrders: 2,
            orderSummaries: [{
                id: "ORD-123123-123123",
                email: "demo@ch.gov.uk",
                productLine: "item#certificate",
                orderDate: "11/04/2022",
                companyNumber: "12345678",
                paymentStatus: "paid",
                links: {
                    self: {
                        link: "/order/ORD-123123-123123"
                    }
                }
            }, {
                id: "ORD-321321-321321",
                email: "demo@ch.gov.uk",
                productLine: "item#missing-image-delivery",
                orderDate: "11/04/2022",
                companyNumber: "87654321",
                paymentStatus: "paid",
                links: {
                    self: {
                        link: "/order/ORD-123123-123123"
                    }
                }
            }]
        });
    });
    it("Stubs a successful checkout response", async () => {
        // given
        const factory = new StubApiClientFactory();
        const expectedResponse = {
            "greeting": "hello"
        };
        factory.willReturnSuccessfulCheckoutResponse(expectedResponse);
        const client = factory.newApiClient("F00DFACE");

        // when
        const result = await client.checkout.getCheckout("ORD-123123-123123") as Success<ApiResponse<Checkout>, ApiErrorResponse>;

        // then
        expect(result.isFailure()).toEqual(false);
        expect(result.isSuccess()).toEqual(true);
        expect(result.value.httpStatusCode).toEqual(200);
        expect(result.value.resource).toEqual(expectedResponse);
    });

    it("Stubs an error checkout response", async () => {
        // given
        const factory = new StubApiClientFactory();
        const expectedResponse = {
            "greeting": "hello"
        };
        factory.willReturnErrorCheckoutResponse(400, expectedResponse);
        const client = factory.newApiClient("F00DFACE");

        // when
        const result = await client.checkout.getCheckout("ORD-123123-123123") as Failure<ApiResponse<Checkout>, ApiErrorResponse>;

        // then
        expect(result.isFailure()).toEqual(true);
        expect(result.isSuccess()).toEqual(false);
        expect(result.value.httpStatusCode).toEqual(400);
        expect(result.value.errors).toEqual(expectedResponse);
    });

    it("Returns a default checkout response if no stubbing performed", async () => {
        // given
        const factory = new StubApiClientFactory();
        const client = factory.newApiClient("F00DFACE");

        // when
        const result = await client.checkout.getCheckout("ORD-123123-123123") as Success<ApiResponse<Checkout>, ApiErrorResponse>;

        // then
        expect(result.isFailure()).toEqual(false);
        expect(result.isSuccess()).toEqual(true);
        expect(result.value.httpStatusCode).toEqual(200);
        expect(result.value.resource).toEqual({
            paidAt: "2022-01-01T12:00:00.000Z",
            status: "paid",
            checkedOutBy: {
                id: "123456",
                email: "demo@ch.gov.uk"
            },
            links: {
                self: `/orders/ORD-123123-123123`,
                payment: `"/basket/checkouts/ORD-123123-123123/payment"`
            },
            paymentReference: "F00DFACE",
            etag: "CAFE",
            deliveryDetails: {
                addressLine1: "address line 1",
                addressLine2: "address line 2",
                country: "country",
                forename: "forename",
                locality: "locality",
                postalCode: "postal code",
                region: "region",
                surname: "surname",
                poBox: "po box"
            },
            items: [{
                id: "CRT-123456-123456",
                companyName: "TEST COMPANY LIMITED",
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
                },
                etag: "abcdefg123456",
                kind: "item#certificate",
                links: {
                    self: "/orderable/certificates/CRT-123456-123456"
                },
                postalDelivery: true,
                quantity: 1,
                itemUri: "/orderable/certificates/CRT-123456-123456",
                status: "unknown",
                postageCost: "0",
                totalItemCost: "15",
                customerReference: "mycert",
                satisfiedAt: "2022-01-01T12:00:00.000Z"
            }],
            kind: "order",
            totalOrderCost: "15",
            reference: "ORD-123123-123123"
        });
    });
});
