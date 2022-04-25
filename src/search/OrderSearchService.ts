import {Inject, Service} from "typedi";
import "reflect-metadata";
import {SearchService} from "./SearchService";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchResults} from "./SearchResults";
import {SearchResultsMapper} from "./SearchResultsMapper";
import "../client/ApiClientFactory";
import "../client/StubApiClientFactory";
import {ApiClientFactory} from "../client/ApiClientFactory";

@Service()
export class OrderSearchService implements SearchService {
    constructor(@Inject(process.env.SERVICE_IMPLEMENTATION || "default.client") private apiClientFactory: ApiClientFactory, private resultsMapper: SearchResultsMapper) {
    }

    async findOrders(searchParameters: OrderSearchParameters): Promise<SearchResults> {
        const apiClient = this.apiClientFactory.newApiClient();
        const response = await apiClient.orderSearchService.search({
            ...searchParameters.searchCriteria,
            pageSize: searchParameters.pageSize
        });
        return this.resultsMapper.map(response);
    }
}
