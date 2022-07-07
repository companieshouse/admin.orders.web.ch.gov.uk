import {jest} from "@jest/globals";
import {SearchRequest, SearchResponse, CheckoutSummary as OrderSummaryResource} from "@companieshouse/api-sdk-node/dist/services/order/search";
import {OrderSearchService} from "../../src/search/OrderSearchService";
import {SearchResults} from "../../src/search/SearchResults";
import {Status} from "../../src/core/Status";
import {ApiResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import {Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import {OrderSearchParameters} from "../../src/search/OrderSearchParameters";
import {SearchCriteria} from "../../src/search/SearchCriteria";
import {OrderSummary} from "../../src/search/OrderSummary";

describe("OrderSearchService", () => {
    it("Fetches and transforms orders from the search API", async () => {
        // given
        const searchResponse = new Success<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                totalOrders: 10,
                orderSummaries: [{
                    id: "ORD-123123-123123",
                    email: "demo@ch.gov.uk",
                    companyNumber: "12345678",
                    productLine: "Certificate",
                    orderDate: "01/01/2022",
                    paymentStatus: "paid",
                    links: {
                        self: {
                            link: "/link/to/order"
                        }
                    }
                }] as OrderSummaryResource[]
            } as SearchResponse
        });
        const searchClient: any = {};
        searchClient.search = jest.fn(() => {
            return searchResponse;
        });
        const apiClientFactory: any = {};
        apiClientFactory.newApiClient = jest.fn(() => {
            return {
                orderSearchService: searchClient
            };
        });
        const mappedResults: SearchResults = {
            status: Status.SUCCESS,
            totalOrders: 10,
            orderSummaries: [{
                id: "ORD-123123-123123",
                email: "demo@ch.gov.uk",
                extraProperties: {
                    companyNumber: "12345678"
                },
                productLine: "Certificate",
                orderDate: "01/01/2022",
                paymentStatus: "Paid",
                links: {
                    self: {
                        link: "/link/to/order"
                    }
                }
            } as OrderSummary]
        };
        const resultsMapper: any = {};
        resultsMapper.map = jest.fn(() => {
            return mappedResults;
        });
        const service = new OrderSearchService(apiClientFactory, resultsMapper);

        // when
        const result = await service.findOrders(new OrderSearchParameters(new SearchCriteria(1000, "ORD-123123-123123", "demo@ch.gov.uk", "12345678"), "F00DFACE"));

        // then
        expect(result).toBe(mappedResults);
        expect(apiClientFactory.newApiClient).toHaveBeenCalled();
        expect(searchClient.search).toHaveBeenCalledWith({
            id: "ORD-123123-123123",
            email: "demo@ch.gov.uk",
            companyNumber: "12345678",
            pageSize: 1000
        } as SearchRequest);
        expect(resultsMapper.map).toHaveBeenCalledWith(searchResponse);
    });
});
