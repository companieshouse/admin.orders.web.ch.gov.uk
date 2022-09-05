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

@Service("singleItemSearch")
export class SingleItemSearchViewComponentFactory implements SearchViewComponentFactory {

    newSearchPageModel(pageTitle: string): ViewComponent {
        return new SearchPage(pageTitle);
    }

    newSearchComponentModel(searchCriteria?: SearchCriteria): ViewComponent {
        return new SearchComponent(searchCriteria);
    }

    newSearchResultComponentModel(orderSummary: OrderSummary): ViewComponent {
        return new SearchResultComponent(orderSummary);
    }

    newSearchResultsComponentModel(results: SearchResultComponent[], total: number): ViewComponent {
        return new SearchResultsComponent(results, total);
    }
}
