import {SearchPage} from "./SearchPage";
import {SearchComponent} from "./SearchComponent";
import {SearchResultsComponent} from "./SearchResultsComponent";
import {SearchResultComponent} from "./SearchResultComponent";
import {Service} from "typedi";
import "reflect-metadata";
import {ViewModel} from "../core/ViewModel";
import {ServiceUnavailableComponent} from "../core/ServiceUnavailableComponent";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchResults} from "./SearchResults";

@Service()
export class PageFactory {
    public static readonly SEARCH_PAGE_TITLE = "Search for an order";
    public static readonly ERROR_PAGE_TITLE = "Service unavailable";

    public buildInitialSearchPage(): ViewModel {
        const page = new SearchPage(PageFactory.SEARCH_PAGE_TITLE);
        page.add(new SearchComponent());
        return page.render();
    }

    public buildSearchPageWithResults(searchParameters: OrderSearchParameters, results: SearchResults): ViewModel {
        const page = new SearchPage(PageFactory.SEARCH_PAGE_TITLE);
        const searchControls = new SearchComponent(searchParameters.searchCriteria);
        const resultEntries = results.orderSummaries.map(result => new SearchResultComponent(result));
        const resultsViewContainer = new SearchResultsComponent(resultEntries, results.totalOrders);
        page.add(searchControls);
        page.add(resultsViewContainer);
        return page.render();
    }

    public buildServiceUnavailable(): ViewModel {
        const page = new SearchPage(PageFactory.ERROR_PAGE_TITLE);
        page.add(new ServiceUnavailableComponent());
        return page.render();
    }
}
