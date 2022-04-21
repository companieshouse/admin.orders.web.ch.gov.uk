import { given, when, then, binding } from "cucumber-tsflow";
import { SearchPage, NoPage, OrdersSearchPage, NoSearchResultsPage, SearchResultsPage, ErrorPage} from "./SearchPage";
import Container from "typedi";
import "reflect-metadata";
import {SeleniumBrowserAgent} from "../core/SeleniumBrowserAgent";

@binding()
export class SearchSteps {
    readonly ordersSearchPageState: OrdersSearchPage;
    readonly noSearchResultsPageState: NoSearchResultsPage;
    readonly searchResultsPageState: SearchResultsPage;
    readonly errorPageState: ErrorPage;

    private _currentPage: SearchPage;

    private _memory: Map<string, string>;

    constructor(browserAgent: SeleniumBrowserAgent = Container.get(SeleniumBrowserAgent)) {
        this.ordersSearchPageState = new OrdersSearchPage(this, browserAgent);
        this.noSearchResultsPageState = new NoSearchResultsPage(this, browserAgent);
        this.searchResultsPageState = new SearchResultsPage(this, browserAgent);
        this.errorPageState = new ErrorPage(this, browserAgent);
        this._currentPage = new NoPage(this, browserAgent);
        this._memory = new Map<string, string>();
    }

    @given(/^I am at the Orders Search Page$/)
    public async navigateToOrdersSearchPage(): Promise<void> {
        await this._currentPage.openSearchPage();
    }

    @given(/^I have entered a valid Order-ID that matches the order-id of an existing order$/)
    public async enterOrderId(text: string): Promise<void> {
        await this._currentPage.enterOrderId(text);
    }

    @when(/^I click search$/)
    public async clickSearch(): Promise<void> {
        await this._currentPage.clickSearch();
    }

    @then(/^The matching order should be displayed in the table of results$/)
    public async verifySearchResultsPage(): Promise<void> {
        await this._currentPage.verify();
    }
    ///
    @given(/^I have entered a valid email address that matches the e-mail address of existing orders$/)
    public async enterEmail(text: string): Promise<void> {
        await this._currentPage.enterEmail(text);
    }

    @then(/^The first page of results should be displayed in the table of results$/)

    @then(/^The results are displayed in date order (most recent to oldest)$/)

    ///
    @given(/^I have entered a company number that matches the company number of existing orders$/)
    public async enterCompanyNumber(text: string): Promise<void> {
        await this._currentPage.enterCompanyNumber(text);
    }
    ///
    @given(/^The result set will contain an order where the payment status IS “paid” AND order type IS “Certificate”$/)
    @then(/^The matching order should have a hyperlink to the order details page for that order$/)

    ///
    @given(/^The result set will contain an order where the where payment status is NOT "paid" AND/OR the order type IS NOT "Certificate"$/)
    @then(/^ And   The matching order should not have a hyperlink to the order details page for that order$/)

    ///
    @given(/^I have entered a search criteria$/)
    @then(/^The search criteria should be preserved in the text boxes$/)
    ///
    @given(/^No results will match my criteria$/)
    @then(/^A message stating “No matches found” is displayed$/)
    public async verifyNoSearchResultsPage(): Promise<void> {
        await this._currentPage.verify();
    ///
    @given(/^The orders-api is unavailable$/)
    
    @then(/^A message is displayed stating “Service unavailable” is displayed$/)


    
    public getValue(key: string): string {
        return this._memory.get(key) || "";
    }

    public setValue(key: string, value: string): void {
        this._memory.set(key, value);
    }

}

