import {SearchViewComponentFactory} from "./SearchViewComponentFactory";
import {ViewComponent} from "../core/ViewComponent";
import {SearchComponent} from "./SearchComponent";
import {SearchCriteria} from "./SearchCriteria";
import {SearchPage} from "./SearchPage";
import {SearchResultComponent} from "./SearchResultComponent";
import {OrderSummary} from "./OrderSummary";
import {SearchResultsComponent} from "./SearchResultsComponent";
import "reflect-metadata";
import {Service} from "typedi";

@Service("multiItemSearch")
export class MultiItemSearchViewComponentFactory implements SearchViewComponentFactory {

    newSearchPageModel(pageTitle: string): ViewComponent {
        return new SearchPage(pageTitle);
    }

    newSearchComponentModel(searchCriteria?: SearchCriteria): ViewComponent {
        return new SearchComponent(searchCriteria, "search/multi/search_component.njk");
    }

    newSearchResultComponentModel(orderSummary: OrderSummary): ViewComponent {
        return new SearchResultComponent(orderSummary, "search/multi/search_result.njk");
    }

    newSearchResultsComponentModel(results: SearchResultComponent[], total: number): ViewComponent {
        return new SearchResultsComponent(results, total, "search/multi/search_results.njk");
    }
}
