import {Service} from "typedi";
import "reflect-metadata";
import {SearchService} from "./SearchService";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchResults} from "./SearchResults";
import {
    OrderSearchService as OrderSearchClient,
    SearchRequest
} from "@companieshouse/api-sdk-node/src/services/order/search";
import {SearchResultsMapper} from "./SearchResultsMapper";

@Service()
export class OrderSearchService implements SearchService {
    constructor(private searchClient: OrderSearchClient, private resultsMapper: SearchResultsMapper) {
    }

    async findOrders(searchParameters: OrderSearchParameters): Promise<SearchResults> {
        const response = await this.searchClient.search({...searchParameters.searchCriteria} as SearchRequest);
        return this.resultsMapper.map(response);
    }
}
