import {SearchPage} from "./SearchPage";
import {SearchComponent} from "./SearchComponent";
import {SearchResultsComponent} from "./SearchResultsComponent";
import {SearchResultComponent} from "./SearchResultComponent";
import {Service} from "typedi";
import "reflect-metadata";
import {ViewModel} from "../core/ViewModel";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchResults} from "./SearchResults";
import {GlobalPageFactory} from "../core/GlobalPageFactory";
import {ErrorPageBuildable} from "../core/ErrorPageBuildable";

@Service()
export class PageFactory implements ErrorPageBuildable {
    public static readonly SEARCH_PAGE_TITLE = "Search for an order";

    constructor(private globalPageFactory: GlobalPageFactory) {
    }

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

    buildServiceUnavailable(): ViewModel {
        return this.globalPageFactory.buildServiceUnavailable();
    }

    buildUnauthorised(): ViewModel {
        return this.globalPageFactory.buildUnauthorised();
    }
}
