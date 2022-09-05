import {PageFactory} from "../../src/search/PageFactory";
import {ViewModel} from "../../src/core/ViewModel";
import {SearchResults} from "../../src/search/SearchResults";
import {Status} from "../../src/core/Status";
import {GlobalPageFactory} from "../../src/core/GlobalPageFactory";
import {SearchViewComponentFactory} from "../../src/search/SearchViewComponentFactory";
import {SingleItemSearchViewComponentFactory} from "../../src/search/SingleItemSearchViewComponentFactory";
import {MultiItemSearchViewComponentFactory} from "../../src/search/MultiItemSearchViewComponentFactory";
import {FEATURE_FLAGS} from "../../src/config/FeatureOptions";

describe("PageFactory", () => {
    afterAll(() => {
        FEATURE_FLAGS.multiItemBasketEnabled = false;
    });

    it("Builds the initial search page", () => {
        // given
        FEATURE_FLAGS.multiItemBasketEnabled = false;
        const pageFactory = new PageFactory(new SingleItemSearchViewComponentFactory(), new MultiItemSearchViewComponentFactory(), new GlobalPageFactory());

        // when
        const actual = pageFactory.buildInitialSearchPage();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            {
                template: "search/search_component.njk",
                controls: [],
                data: undefined
            }
        ], {
            title: PageFactory.SEARCH_PAGE_TITLE
        }));
    });

    it("Builds the initial search page for searching orders with multiple items", () => {
        // given
        FEATURE_FLAGS.multiItemBasketEnabled = true;
        const pageFactory = new PageFactory(new SingleItemSearchViewComponentFactory(), new MultiItemSearchViewComponentFactory(), new GlobalPageFactory());

        // when
        const actual = pageFactory.buildInitialSearchPage();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            {
                template: "search/multi/search_component.njk",
                controls: [],
                data: undefined
            }
        ], {
            title: PageFactory.SEARCH_PAGE_TITLE
        }));
    });

    it("Builds the search page with results", () => {
        // given
        FEATURE_FLAGS.multiItemBasketEnabled = false;
        const pageFactory = new PageFactory(new SingleItemSearchViewComponentFactory(), new MultiItemSearchViewComponentFactory(), new GlobalPageFactory());
        const searchCriteria = {
            id: "ORD-123123-123123",
            email: "demo@ch.gov.uk",
            companyNumber: "12345678",
            pageSize: 5
        };
        const orderSummary = {
            id: "ORD-234234-234234",
            detailHref: "/link/to/order",
            email: "demo@ch.gov.uk",
            productLine: "Certificate",
            orderDate: "01/01/2022",
            paymentStatus: "Paid",
            extraProperties: {
                companyNumber: "12345678"
            }
        };
        const searchResults: SearchResults = {
            status: Status.SUCCESS,
            totalOrders: 10,
            orderSummaries: [orderSummary]
        };

        // when
        const actual = pageFactory.buildSearchPageWithResults(searchCriteria, searchResults);

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("search/search_component.njk", [], searchCriteria),

            new ViewModel("search/search_results.njk", [
                new ViewModel("search/search_result.njk", [], orderSummary)
            ], {
                    pageSize: 1,
                    total: 10
                })
            ], {
            title: PageFactory.SEARCH_PAGE_TITLE
        }));
    });

    it("Builds the search page with results summarising multi-item orders", () => {
        // given
        FEATURE_FLAGS.multiItemBasketEnabled = true;
        const pageFactory = new PageFactory(new SingleItemSearchViewComponentFactory(), new MultiItemSearchViewComponentFactory(), new GlobalPageFactory());
        const searchCriteria = {
            id: "ORD-123123-123123",
            email: "demo@ch.gov.uk",
            companyNumber: "12345678",
            pageSize: 5
        };
        const orderSummary = {
            id: "ORD-234234-234234",
            detailHref: "/link/to/order",
            email: "demo@ch.gov.uk",
            orderDate: "01/01/2022",
            paymentStatus: "Paid",
            extraProperties: {
            }
        };
        const searchResults: SearchResults = {
            status: Status.SUCCESS,
            totalOrders: 10,
            orderSummaries: [orderSummary]
        };

        // when
        const actual = pageFactory.buildSearchPageWithResults(searchCriteria, searchResults);

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("search/multi/search_component.njk", [], searchCriteria),

            new ViewModel("search/multi/search_results.njk", [
                new ViewModel("search/multi/search_result.njk", [], orderSummary)
            ], {
                pageSize: 1,
                total: 10
            })
        ], {
            title: PageFactory.SEARCH_PAGE_TITLE
        }));
    });

    it("Builds the search page with no results", () => {
        // given
        FEATURE_FLAGS.multiItemBasketEnabled = false;
        const pageFactory = new PageFactory(new SingleItemSearchViewComponentFactory(), new MultiItemSearchViewComponentFactory(), new GlobalPageFactory());
        const searchCriteria = {
            id: "ORD-123123-123123",
            email: "demo@ch.gov.uk",
            companyNumber: "12345678",
            pageSize: 5
        };
        const searchResults: SearchResults = {
            status: Status.SUCCESS,
            totalOrders: 0,
            orderSummaries: []
        };

        // when
        const actual = pageFactory.buildSearchPageWithResults(searchCriteria, searchResults);

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("search/search_component.njk", [], searchCriteria),
            new ViewModel("search/no_results_found.njk", [], {
                pageSize: 0,
                total: 0
            })
        ], {
            title: PageFactory.SEARCH_PAGE_TITLE
        }));
    });

    it("Builds the search page with no results for multi-item orders", () => {
        // given
        FEATURE_FLAGS.multiItemBasketEnabled = true;
        const pageFactory = new PageFactory(new SingleItemSearchViewComponentFactory(), new MultiItemSearchViewComponentFactory(), new GlobalPageFactory());
        const searchCriteria = {
            id: "ORD-123123-123123",
            email: "demo@ch.gov.uk",
            companyNumber: "12345678",
            pageSize: 5
        };
        const searchResults: SearchResults = {
            status: Status.SUCCESS,
            totalOrders: 0,
            orderSummaries: []
        };

        // when
        const actual = pageFactory.buildSearchPageWithResults(searchCriteria, searchResults);

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("search/multi/search_component.njk", [], searchCriteria),
            new ViewModel("search/no_results_found.njk", [], {
                pageSize: 0,
                total: 0
            })
        ], {
            title: PageFactory.SEARCH_PAGE_TITLE
        }));
    });

    it("Builds a service unavailable page", () => {
        // given
        const pageFactory = new PageFactory(dummyComponentFactory(), dummyComponentFactory(), new GlobalPageFactory());

        // when
        const actual = pageFactory.buildServiceUnavailable();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("service_unavailable.njk", [])
        ], {
            title: "Service unavailable"
        }));
    });

    it("Builds an unauthorised page", () => {
        // given
        const pageFactory = new PageFactory(dummyComponentFactory(), dummyComponentFactory(), new GlobalPageFactory());

        // when
        const actual = pageFactory.buildUnauthorised();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("unauthorised.njk", [])
        ], {
            title: "Unauthorised"
        }));
    });

    it("Builds a not found page", () => {
        // given
        const pageFactory = new PageFactory(dummyComponentFactory(), dummyComponentFactory(), new GlobalPageFactory());

        // when
        const actual = pageFactory.buildNotFound();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("not_found.njk", [])
        ], {
            title: "Page not found"
        }));
    });
});

const dummyComponentFactory = (): SearchViewComponentFactory => {
    return jest.createMockFromModule("../../src/search/SearchViewComponentFactory");
};
