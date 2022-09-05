import {Inject, Service} from "typedi";
import "reflect-metadata";
import {ViewModel} from "../core/ViewModel";
import {SearchResults} from "./SearchResults";
import {GlobalPageFactory} from "../core/GlobalPageFactory";
import {ErrorPageBuildable} from "../core/ErrorPageBuildable";
import {SearchCriteria} from "./SearchCriteria";
import {SearchViewComponentFactory} from "./SearchViewComponentFactory";
import "./SingleItemSearchViewComponentFactory";
import "./MultiItemSearchViewComponentFactory";
import {FEATURE_FLAGS} from "../config/FeatureOptions";

@Service()
export class PageFactory implements ErrorPageBuildable {
    public static readonly SEARCH_PAGE_TITLE = "Search for an order";

    constructor(@Inject("singleItemSearch") private singleItemComponentFactory: SearchViewComponentFactory,
                @Inject("multiItemSearch") private multiItemComponentFactory: SearchViewComponentFactory,
                private globalPageFactory: GlobalPageFactory) {
    }

    public buildInitialSearchPage(): ViewModel {
        const componentFactory = FEATURE_FLAGS.multiItemBasketEnabled ? this.multiItemComponentFactory : this.singleItemComponentFactory;
        const page = componentFactory.newSearchPageModel(PageFactory.SEARCH_PAGE_TITLE);
        page.add(componentFactory.newSearchComponentModel());
        return page.render();
    }

    public buildSearchPageWithResults(searchCriteria: SearchCriteria, results: SearchResults): ViewModel {
        const componentFactory = FEATURE_FLAGS.multiItemBasketEnabled ? this.multiItemComponentFactory : this.singleItemComponentFactory;
        const page = componentFactory.newSearchPageModel(PageFactory.SEARCH_PAGE_TITLE);
        const searchControls = componentFactory.newSearchComponentModel(searchCriteria);
        const resultEntries = results.orderSummaries.map(result => componentFactory.newSearchResultComponentModel(result));
        const resultsViewContainer = componentFactory.newSearchResultsComponentModel(resultEntries, results.totalOrders);
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

    buildNotFound(): ViewModel {
        return this.globalPageFactory.buildNotFound();
    }
}
