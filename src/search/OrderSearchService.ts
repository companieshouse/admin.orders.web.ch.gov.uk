import {Service} from "typedi";
import "reflect-metadata";
import {SearchService} from "./SearchService";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchResults} from "./SearchResults";
import {SearchResultsMapper} from "./SearchResultsMapper";
import {ApiClientFactory} from "../client/ApiClientFactory";

@Service()
export class OrderSearchService implements SearchService {
    constructor(private apiClientFactory: ApiClientFactory, private resultsMapper: SearchResultsMapper) {
    }

    async findOrders(searchParameters: OrderSearchParameters): Promise<SearchResults> {
        const apiClient = this.apiClientFactory.newApiClient();
        const response = await apiClient.orderSearchService.search({...searchParameters.searchCriteria});
        return this.resultsMapper.map(response);
    }
}
