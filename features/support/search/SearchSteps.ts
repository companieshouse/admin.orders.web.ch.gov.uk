import { given, when, then, binding } from "cucumber-tsflow";
import {
    SearchPage,
    NoPage,
    OrdersSearchPage,
    NoSearchResultsPage,
    SearchResultsPage,
    ErrorPage,
    AnticipateResultsPage, AnticipateNoResultsPage, AnticipateErrorPage
} from "./SearchPage";
import Container from "typedi";
import "reflect-metadata";
import {BrowserAgent} from "../core/BrowserAgent";
import {DataTable} from "@cucumber/cucumber";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";

@binding()
export class SearchSteps {
    readonly ordersSearchPageState: OrdersSearchPage;
    readonly anticipateResultsPageState: AnticipateResultsPage;
    readonly anticipateNoResultsPageState: AnticipateNoResultsPage;
    readonly anticipateErrorPageState: AnticipateErrorPage;
    readonly noSearchResultsPageState: NoSearchResultsPage;
    readonly searchResultsPageState: SearchResultsPage;
    readonly errorPageState: ErrorPage;

    currentPage: SearchPage;

    private memory: Map<string, string>;

    constructor(browserAgent: BrowserAgent = Container.get(process.env.agent || "selenium"), apiFactory: StubApiClientFactory = Container.get("stub.client")) {
        this.ordersSearchPageState = new OrdersSearchPage(this, browserAgent, apiFactory);
        this.anticipateResultsPageState = new AnticipateResultsPage(this, browserAgent, apiFactory);
        this.anticipateNoResultsPageState = new AnticipateNoResultsPage(this, browserAgent, apiFactory);
        this.anticipateErrorPageState = new AnticipateErrorPage(this, browserAgent, apiFactory);
        this.noSearchResultsPageState = new NoSearchResultsPage(this, browserAgent, apiFactory);
        this.searchResultsPageState = new SearchResultsPage(this, browserAgent, apiFactory);
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
    public async ordersApiUnavailable(): Promise<void> {
        await this.currentPage.enterOrderId("error");
    }

    @given(/^Orders API will return results$/)
    public async ordersApiWillReturnResults(): Promise<void> {
        await this.currentPage.harnessOrdersApiWithResults();
    }

    @given(/^Orders API will return no results$/)
    public async ordersApiWillReturnNoResults(): Promise<void> {
        await this.currentPage.harnessOrdersApiWithNoResults();
    }

    @given(/^Orders API will return an error$/)
    public async ordersApiWillReturnError(): Promise<void> {
        await this.currentPage.harnessOrdersApiWithError();
    }

    @when(/^I click search$/)
    public async clickSearch(): Promise<void> {
        await this.currentPage.clickSearch();
    }

    @when(/^I click sign out$/)
    public async clickSignOut(): Promise<void> {
        await this.currentPage.clickSignOut();
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

    @then(/^The following orders should be displayed:$/)
    public async verifyResults(results: DataTable): Promise<void> {
        await this.currentPage.verifyLayout();
        await this.currentPage.verifyMatchingOrdersDisplayed(results.rows());
    }

    @then(/^I should be taken to the signout handler$/)
    public async verifySignInHandler() {
        await this.currentPage.verifyLocation("/signout");
    }

    @given(/^I am on the orders search page and have clicked search$/)
    public async clickAndDisplaySearchResults(): Promise<void> {
        await this.currentPage.openSearchPage();
        await this.currentPage.harnessOrdersApiWithResults();
        await this.currentPage.clickSearch();
    }

    @when(/^I click on the linkable certificate resource$/)
    async clickLinkableCertificate(): Promise<void> {
        await this.currentPage.clickLinkableCertificate();
    }

    public getValue(key: string): string {
        return this.memory.get(key) || "";
    }

    public setValue(key: string, value: string): void {
        this.memory.set(key, value);
    }
}

