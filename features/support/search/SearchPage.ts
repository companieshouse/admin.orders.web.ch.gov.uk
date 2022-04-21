import { SearchSteps } from "./SearchSteps";
import { expect } from "chai";
import { BrowserAgent } from "../core/BrowserAgent";
import "reflect-metadata";

export interface SearchPage {
    openSearchPage(): Promise<void>
    searchNoResultsExpected(): Promise<void>
    searchResultsExpected(): Promise<void>
    enterOrderId(text: string): Promise<void>
    enterEmail(text: string): Promise<void>
    enterCompanyNumber(text: string): Promise<void>
    clickSearch(): Promise<void>
    verify(): Promise<void>
}

export class NoPage implements SearchPage {
    public constructor(private searchSteps: SearchSteps, private interactor: BrowserAgent) {
    }

    public async openSearchPage(): Promise<void> {
        await this.interactor.openPage("/orders-admin/search");
        this.searchSteps.currentPage = this.searchSteps.ordersSearchPageState;
    }

    public async searchNoResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterOrderId(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterEmail(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterCompanyNumber(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickSearch(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async verify(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        expect(headingText).equals("Search for an order");
    }
}

export class OrdersSearchPage implements SearchPage {
    public constructor(private searchSteps: SearchPage, private interactor: BrowserAgent) {
    }

    public async openSearchPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchNoResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterOrderId(text: string): Promise<void> {
        await this.interactor.inputText("#orderNumber", text);
        this.searchSteps.setValue("order Id", text);
    }

    public async enterEmail(text: string): Promise<void> {
        await this.interactor.inputText("#email", text);
        this.searchSteps.setValue("email", text);
    }

    public async enterCompanyNumber(text: string): Promise<void> {
        await this.interactor.inputText("#companyNumber", text);
        this.searchSteps.setValue("company number", text);
    }

    //
    public async clickSearch(): Promise<void> {
        await this.interactor.clickElement("#main-content > form > button");
        this.searchSteps.currentPage = this.searchSteps.noSearchResultsPageState;
        await this.interactor.clickElement(".govuk-button");
        if (this.searchSteps.getValue("order Id") === "nonexistent") {
            this.searchSteps.currentPage = this.searchSteps.noSearchResultsPageState;
        } else if (this.searchSteps.getValue("order Id") === "error") {
            this.searchSteps.currentPage = this.searchSteps.errorPageState;
        } else {
            this.searchSteps.currentPage = this.searchSteps.searchResultsPageState;
        }
    }

    public async verify(): Promise<void> {
        throw new Error("Invalid operation");
    }
}

export class NoSearchResultsPage implements SearchPage {
    public constructor(private searchSteps: SearchPage, private interactor: BrowserAgent) {
    }

    public async openSearchPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchNoResultsExpected(): Promise<void> {
        await this.interactor.openPage("/orders-admin/search");
        this.searchSteps.currentPage = this.searchSteps.noSearchResultsPageState;
    }

    public async searchResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterOrderId(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterEmail(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterCompanyNumber(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickSearch(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async verify(): Promise<void> {
        const headingText = await this.interactor.getElementText("#main-content > p");
        expect(headingText).equals("No matches found");

    }
}

export class SearchResultsPage implements SearchPage {
    public constructor(private searchSteps: SearchPage, private interactor: BrowserAgent) {
    }

    public async openSearchPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchNoResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchResultsExpected(): Promise<void> {

    }

    public async enterOrderId(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterEmail(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterCompanyNumber(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickSearch(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async verify(): Promise<void> {
        const headingText = await this.interactor.getElementText("#main-content > table > thead > tr > th:nth-child(1)");
        expect(headingText).equals("Order number");
    }
}

export class ErrorPage implements SearchPage {
    public constructor(private searchSteps: SearchSteps, private interactor: BrowserAgent) {
    }

    public async openSearchPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchNoResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterOrderId(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterEmail(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async enterCompanyNumber(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickSearch(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async verify(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        expect(headingText).equals("Search for an order");
    }
}


