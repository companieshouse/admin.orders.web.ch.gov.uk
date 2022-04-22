import {SearchResults} from "./SearchResults";
import {OrderSearchParameters} from "./OrderSearchParameters";

export interface SearchService {
    findOrders(searchParameters: OrderSearchParameters): Promise<SearchResults>
}
