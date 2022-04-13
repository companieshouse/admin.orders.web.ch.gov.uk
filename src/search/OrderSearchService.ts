import {Service} from "typedi";
import "reflect-metadata";
import {SearchService} from "./SearchService";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchResults} from "./SearchResults";

@Service()
export class OrderSearchService implements SearchService {
    async findOrders(searchParameters: OrderSearchParameters): Promise<SearchResults> {
        throw new Error("Not implemented");
    }
}
