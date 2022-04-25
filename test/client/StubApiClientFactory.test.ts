import {StubApiClientFactory} from "../../src/client/StubApiClientFactory";
import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import {SearchResponse} from "@companieshouse/api-sdk-node/dist/services/order/search";

describe("StubApiClientFactory", () => {
    it("Stubs a successful response", async () => {
        // given
        const factory = new StubApiClientFactory();
        const expectedResponse = {
            "greeting": "hello"
        };
        factory.willReturnSuccessfulResponse(expectedResponse);
        const client = factory.newApiClient();

        // when
        const result = await client.orderSearchService.search({ pageSize: 1000 }) as Success<ApiResponse<SearchResponse>, ApiErrorResponse>;

        // then
        expect(result.isFailure()).toEqual(false);
        expect(result.isSuccess()).toEqual(true);
        expect(result.value.httpStatusCode).toEqual(200);
        expect(result.value.resource).toEqual(expectedResponse);
    });

    it("Stubs an error response", async () => {
        // given
        const factory = new StubApiClientFactory();
        const expectedResponse = {
            "greeting": "hello"
        };
        factory.willReturnFailureResponse(400, expectedResponse);
        const client = factory.newApiClient();

        // when
        const result = await client.orderSearchService.search({ pageSize: 1000 }) as Failure<ApiResponse<SearchResponse>, ApiErrorResponse>;

        // then
        expect(result.isFailure()).toEqual(true);
        expect(result.isSuccess()).toEqual(false);
        expect(result.value.httpStatusCode).toEqual(400);
        expect(result.value.errors).toEqual(expectedResponse);
    });

    it("Returns a default response if no stubbing performed", async () => {
        // given
        const factory = new StubApiClientFactory();
        const client = factory.newApiClient();

        // when
        const result = await client.orderSearchService.search({ pageSize: 1000 }) as Success<ApiResponse<SearchResponse>, ApiErrorResponse>;

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
});
