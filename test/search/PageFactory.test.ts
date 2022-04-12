import {PageFactory} from "../../src/search/PageFactory";
import {ViewModel} from "../../src/core/ViewModel";
import {SearchCriteria} from "../../src/search/SearchCriteria";
import {OrderSummary} from "../../src/search/OrderSummary";

describe("PageFactory", () => {
    it("Builds the initial search page", () => {
        // given
        const pageFactory = new PageFactory();

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

    it("Builds the search page with results", () => {
        // given
        const pageFactory = new PageFactory();
        const searchCriteria = new SearchCriteria("ORD-123123-123123", "demo@ch.gov.uk", "12345678");
        const orderSummary = new OrderSummary(
            "ORD-234234-234234",
            "/link/to/order",
            "demo@ch.gov.uk",
            "Certificate",
            "01/01/2022",
            "Paid",
            undefined,
            new Map<string, string>([["companyNumber", "12345678"]])
        );

        // when
        const actual = pageFactory.buildSearchPageWithResults(searchCriteria, [orderSummary]);

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("search/search_component.njk", [], searchCriteria),

            new ViewModel("search/search_results.njk", [
                new ViewModel("search/search_result.njk", [], orderSummary)
            ], {
                    limit: 1,
                    size: 1
                })
            ], {
            title: PageFactory.SEARCH_PAGE_TITLE
        }));
    });

    it("Builds the search page with no results", () => {
        // given
        const pageFactory = new PageFactory();
        const searchCriteria = new SearchCriteria("ORD-123123-123123", "demo@ch.gov.uk", "12345678");

        // when
        const actual = pageFactory.buildSearchPageWithResults(searchCriteria, []);

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("search/search_component.njk", [], searchCriteria),
            new ViewModel("search/no_results_found.njk", [], {
                limit: 0,
                size: 0
            })
        ], {
            title: PageFactory.SEARCH_PAGE_TITLE
        }));
    });

    it("Builds a service unavailable page", () => {
        // given
        const pageFactory = new PageFactory();

        // when
        const actual = pageFactory.buildServiceUnavailable();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("service_unavailable.njk", [])
        ], {
            title: "Service unavailable"
        }));
    });
});
