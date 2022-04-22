import { given, when, then, binding } from "cucumber-tsflow";
import { SearchPage, NoPage, OrdersSearchPage, NoSearchResultsPage, SearchResultsPage, ErrorPage} from "./SearchPage";
import Container from "typedi";
import "reflect-metadata";
import {BrowserAgent} from "../core/BrowserAgent";
import {DataTable} from "@cucumber/cucumber";

@binding()
export class SearchSteps {
    readonly ordersSearchPageState: OrdersSearchPage;
    readonly noSearchResultsPageState: NoSearchResultsPage;
    readonly searchResultsPageState: SearchResultsPage;
    readonly errorPageState: ErrorPage;

    currentPage: SearchPage;

    private memory: Map<string, string>;

    constructor(browserAgent: BrowserAgent = Container.get(process.env.agent || "selenium")) {
        this.ordersSearchPageState = new OrdersSearchPage(this, browserAgent);
        this.noSearchResultsPageState = new NoSearchResultsPage(this, browserAgent);
        this.searchResultsPageState = new SearchResultsPage(this, browserAgent);
        this.errorPageState = new ErrorPage(this, browserAgent);
        this.currentPage = new NoPage(this, browserAgent);
        this.memory = new Map<string, string>();
    }

    @given(/^I have opened the search orders page$/)
    public async navigateToOrdersSearchPage(): Promise<void> {
        await this.currentPage.openSearchPage();
    }

    @given(/^I have entered search criteria for order number, email and company number$/)
    public async enterOrderId(): Promise<void> {
        await this.currentPage.enterOrderId("ORD-123123-123123");
        await this.currentPage.enterEmail("demo@ch.gov.uk");
        await this.currentPage.enterCompanyNumber("12345678");
    }

    @given(/^No results will match my criteria$/)
    public async noMatchingResults(): Promise<void> {
        await this.currentPage.enterOrderId("nonexistent");
    }

    @given(/^Orders API is unavailable$/)
    public async orderApiUnavailable(): Promise<void> {
        await this.currentPage.enterOrderId("error");
    }

    @given(/^An order placed for a certificate has been paid for$/)
    @given(/^An order placed for a missing image delivery has been paid for$/)
    public async noop(): Promise<void> {
    }

    @when(/^I click search$/)
    public async clickSearch(): Promise<void> {
        await this.currentPage.clickSearch();
    }

    @then(/^The search criteria should be preserved$/)
    public async verifySearchCriteriaPreserved(): Promise<void> {
        await this.currentPage.verifySearchCriteriaPreserved();
    }

    @then(/^No matches found should be displayed$/)
    @then(/^The service unavailable page should be displayed$/)
    public async verifyLayout(): Promise<void> {
        await this.currentPage.verifyLayout();
    }

    @then(/^The following results should be returned:$/)
    public async verifyResults(results: DataTable): Promise<void> {
        await this.currentPage.verifyLayout();
        await this.currentPage.verifyMatchingOrdersDisplayed(results.rows());
    }

    public getValue(key: string): string {
        return this.memory.get(key) || "";
    }

    public setValue(key: string, value: string): void {
        this.memory.set(key, value);
    }
}

