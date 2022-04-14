import {jest} from "@jest/globals";
import {SearchRequest, SearchResponse} from "../../../api-sdk-node/src/services/order/search";
import {OrderSearchService} from "../../src/search/OrderSearchService";
import {SearchResults} from "../../src/search/SearchResults";
import {Status} from "../../src/core/Status";
import {ApiResponse} from "../../../api-sdk-node/src/services/resource";
import {Success} from "../../../api-sdk-node/src/services/result";
import {ApiErrorResponse} from "../../../api-sdk-node/src/services/resource";
import {OrderSearchParameters} from "../../src/search/OrderSearchParameters";
import {SearchCriteria} from "../../src/search/SearchCriteria";
import {OrderSummary} from "../../src/search/OrderSummary";
import {OrderSummary as OrderSummaryResource} from "@companieshouse/api-sdk-node/src/services/order/search/types";

describe("OrderSearchService", () => {
    it("Fetches and transforms orders from the search API", async () => {
        // given
        const searchResponse = new Success<ApiResponse<SearchResponse>, ApiErrorResponse>({
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
                } as OrderSummaryResource]
            } as SearchResponse
        });
        const searchClient: any = {};
        searchClient.search = jest.fn(() => {
            return searchResponse;
        });
        const mappedResults: SearchResults = {
            status: Status.SUCCESS,
            orderSummaries: [{
                id: "ORD-123123-123123",
                email: "demo@ch.gov.uk",
                extraProperties: {
                    companyNumber: "12345678"
                },
                productLine: "Certificate",
                orderDate: "01/01/2022",
                paymentStatus: "Paid",
                detailHref: "/orders-admin/order/ORD-123123-123123",
            } as OrderSummary]
        };
        const resultsMapper: any = {};
        resultsMapper.map = jest.fn(() => {
            return mappedResults;
        });
        const service = new OrderSearchService(searchClient, resultsMapper);

        // when
        const result = await service.findOrders(new OrderSearchParameters(new SearchCriteria("ORD-123123-123123", "demo@ch.gov.uk", "12345678")));

        // then
        expect(result).toBe(mappedResults);
        expect(searchClient.search).toHaveBeenCalledWith({
            orderNumber: "ORD-123123-123123",
            email: "demo@ch.gov.uk",
            companyNumber: "12345678"
        } as SearchRequest);
        expect(resultsMapper.map).toHaveBeenCalledWith(searchResponse);
    });
});
