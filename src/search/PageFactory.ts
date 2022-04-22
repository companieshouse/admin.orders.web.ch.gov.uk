import {SearchPage} from "./SearchPage";
import {SearchComponent} from "./SearchComponent";
import {SearchResultsComponent} from "./SearchResultsComponent";
import {SearchCriteria} from "./SearchCriteria";
import {SearchResultComponent} from "./SearchResultComponent";
import {OrderSummary} from "./OrderSummary";
import {Service} from "typedi";
import "reflect-metadata";
import {ViewModel} from "../core/ViewModel";
import {ServiceUnavailableComponent} from "../core/ServiceUnavailableComponent";

@Service()
export class PageFactory {
    public static readonly SEARCH_PAGE_TITLE = "Search for an order";
    public static readonly ERROR_PAGE_TITLE = "Service unavailable";

    public buildInitialSearchPage(): ViewModel {
        const page = new SearchPage(PageFactory.SEARCH_PAGE_TITLE);
        page.add(new SearchComponent());
        return page.render();
    }

    public buildSearchPageWithResults(searchCriteria: SearchCriteria, results: OrderSummary[]): ViewModel {
        const page = new SearchPage(PageFactory.SEARCH_PAGE_TITLE);
        const searchControls = new SearchComponent(searchCriteria);
        const resultEntries = results.map(result => new SearchResultComponent(result));
        const resultsViewContainer = new SearchResultsComponent(resultEntries);
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
