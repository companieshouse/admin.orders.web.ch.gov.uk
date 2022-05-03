import {Inject, Service} from "typedi";
import "reflect-metadata";
import {SearchService} from "./SearchService";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchResults} from "./SearchResults";
import {SearchResultsMapper} from "./SearchResultsMapper";
import {ApiClientFactory} from "../client/ApiClientFactory";
import "../client/ApiClientFactory";
import "../client/StubApiClientFactory";

@Service()
export class OrderSearchService implements SearchService {
    constructor(@Inject((process.env.ADMIN_ORDERS_DEVELOPMENT_MODE === "true" ? "stub.client" : "default.client")) public apiClientFactory: ApiClientFactory, private resultsMapper: SearchResultsMapper) {
    }

    async findOrders(searchParameters: OrderSearchParameters): Promise<SearchResults> {
        const apiClient = this.apiClientFactory.newApiClient(searchParameters.token);
        const response = await apiClient.orderSearchService.search(searchParameters.searchCriteria);
        return this.resultsMapper.map(response);
    }
}
