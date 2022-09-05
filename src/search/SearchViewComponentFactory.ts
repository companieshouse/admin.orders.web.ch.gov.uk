import {ViewComponent} from "../core/ViewComponent";
import {SearchCriteria} from "./SearchCriteria";
import {OrderSummary} from "./OrderSummary";

export interface SearchViewComponentFactory {
    newSearchPageModel(pageTitle: string): ViewComponent;
    newSearchComponentModel(searchCriteria?: SearchCriteria): ViewComponent;
    newSearchResultComponentModel(orderSummary: OrderSummary): ViewComponent;
    newSearchResultsComponentModel(results: ViewComponent[], total: number): ViewComponent;
}
