import {Failure, Success} from "../../../api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse} from "../../../api-sdk-node/dist/services/resource";
import {OrderSummary as OrderSummaryResource, SearchResponse} from "../../../api-sdk-node/src/services/order/search";
import {SearchResultsMapper} from "../../src/search/SearchResultsMapper";
import {OrderSummary} from "../../src/search/OrderSummary";
import {SearchResults} from "../../src/search/SearchResults";
import { Status } from "../../src/core/Status";

describe("SearchResultsMapper", () => {
    it("Maps a successful response", () => {
        // given
        const serverResponse = new Success<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                totalOrders: 1,
                orderSummaries: [{
                    id: "ORD-123123-123123",
                    email: "demo@ch.gov.uk",
                    companyNumber: "12345678",
                    productLine: "Certificate",
                    orderDate: "01/01/2022",
                    paymentStatus: "paid",
                    resourceLink: "/link/to/order"
                }, {
                    id: "ORD-321321-321321",
                    email: "demo2@ch.gov.uk",
                    companyNumber: "87654321",
                    productLine: "Missing Image",
                    orderDate: "05/05/2021",
                    paymentStatus: "paid",
                    resourceLink: "/link/to/order"
                }, {
                    id: "ORD-121212-121212",
                    email: "demo3@ch.gov.uk",
                    companyNumber: "12121212",
                    productLine: "Certificate",
                    orderDate: "12/02/2020",
                    paymentStatus: "not-paid-for",
                    resourceLink: "/link/to/order"
                }] as OrderSummaryResource[]
            } as SearchResponse
        });
        const mapper = new SearchResultsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            orderSummaries: [
                {
                    id: "ORD-123123-123123",
                    email: "demo@ch.gov.uk",
                    extraProperties: {
                        companyNumber: "12345678"
                    },
                    productLine: "Certificate",
                    orderDate: "01/01/2022",
                    paymentStatus: "Paid",
                    detailHref: "/orders-admin/order/ORD-123123-123123",
                },
                {
                    id: "ORD-321321-321321",
                    email: "demo2@ch.gov.uk",
                    extraProperties: {
                        companyNumber: "87654321"
                    },
                    productLine: "Missing Image",
                    orderDate: "05/05/2021",
                    paymentStatus: "Paid"
                },
                {
                    id: "ORD-121212-121212",
                    email: "demo3@ch.gov.uk",
                    extraProperties: {
                        companyNumber: "12121212"
                    },
                    productLine: "Certificate",
                    orderDate: "12/02/2020",
                    paymentStatus: "Not paid for"
                }
            ] as OrderSummary[]
        } as SearchResults);
    });

    it("Maps an error response", () => {
        // given
        const serverResponse = new Failure<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: 401,
            errors: [{
                error: "Something went wrong",
            }, {
                error: "Something else went wrong"
            }]
        });
        const mapper = new SearchResultsMapper();

        // when
        const actual = mapper.map(serverResponse);

        // then
        expect(actual).toEqual({
            status: Status.SERVER_ERROR
        });
    });
});
