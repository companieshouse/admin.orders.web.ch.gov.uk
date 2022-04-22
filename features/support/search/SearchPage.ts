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
        throw new Error("Invalid operation");
    }
}

export class OrdersSearchPage implements SearchPage {
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
        await this.interactor.inputText("#orderNumber", text);
        this.searchSteps.setValue("order_id", text);
    }

    public async enterEmail(text: string): Promise<void> {
        await this.interactor.inputText("#email", text);
        this.searchSteps.setValue("email", text);
    }

    public async enterCompanyNumber(text: string): Promise<void> {
        await this.interactor.inputText("#companyNumber", text);
        this.searchSteps.setValue("company_number", text);
    }

    public async clickSearch(): Promise<void> {
        await this.interactor.clickElement("#main-content > form > button");
        if (this.searchSteps.getValue("order_id") === "nonexistent") {
            this.searchSteps.currentPage = this.searchSteps.noSearchResultsPageState;
        } else if (this.searchSteps.getValue("order_id") === "error") {
            this.searchSteps.currentPage = this.searchSteps.errorPageState;
        } else {
            this.searchSteps.currentPage = this.searchSteps.searchResultsPageState;
        }
    }

    public async verify(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        expect(headingText).equals("Search for an order");
        expect(await this.interactor.elementExists("#orderNumber")).to.be.true;
        expect(await this.interactor.elementExists("#email")).to.be.true;
        expect(await this.interactor.elementExists("#companyNumber")).to.be.true;
        expect(await this.interactor.elementExists("#main-content > form > button")).to.be.true;
    }
}

export class NoSearchResultsPage implements SearchPage {
    public constructor(private searchSteps: SearchSteps, private interactor: BrowserAgent) {
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
        const pageHeadingText = await this.interactor.getElementText("h1");
        const resultSummaryText = await this.interactor.getElementText("#main-content > p");
        expect(pageHeadingText).equals("Search for an order");
        expect(await this.interactor.elementExists("#orderNumber")).to.be.true;
        expect(await this.interactor.elementExists("#email")).to.be.true;
        expect(await this.interactor.elementExists("#companyNumber")).to.be.true;
        expect(await this.interactor.elementExists("#main-content > form > button")).to.be.true;
        expect(resultSummaryText).equals("No matches found");

    }
}

export class SearchResultsPage implements SearchPage {
    public constructor(private searchSteps: SearchSteps, private interactor: BrowserAgent) {
    }

    public async openSearchPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchNoResultsExpected(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async searchResultsExpected(): Promise<void> {
        await this.interactor.openPage("/orders-admin/search");
        this.searchSteps.currentPage = this.searchSteps.searchResultsPageState;
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
        const pageHeadingText = await this.interactor.getElementText("h1");
        const resultsTable = await this.interactor.getTable(".govuk-table");

        expect(pageHeadingText).equals("Search for an order");

        expect(await this.interactor.elementExists("#orderNumber")).to.be.true;
        expect(await this.interactor.elementExists("#email")).to.be.true;
        expect(await this.interactor.elementExists("#companyNumber")).to.be.true;
        expect(await this.interactor.elementExists("#main-content > form > button")).to.be.true;

        expect(resultsTable.getRow(0).getData("Order number")).to.equal("ORD-123123-123123");
        expect(resultsTable.getRow(0).getData("Email")).to.equal("demo@ch.gov.uk");
        expect(resultsTable.getRow(0).getData("Company number")).to.equal("12345678");
        expect(resultsTable.getRow(0).getData("Order type")).to.equal("Certificate");
        expect(resultsTable.getRow(0).getData("Order date")).to.equal("11/04/2022");
        expect(resultsTable.getRow(0).getData("Payment status")).to.equal("Paid");

        expect(resultsTable.getRow(1).getData("Order number")).to.equal("ORD-321321-321321");
        expect(resultsTable.getRow(1).getData("Email")).to.equal("demo@ch.gov.uk");
        expect(resultsTable.getRow(1).getData("Company number")).to.equal("87654321");
        expect(resultsTable.getRow(1).getData("Order type")).to.equal("Missing image");
        expect(resultsTable.getRow(1).getData("Order date")).to.equal("11/04/2022");
        expect(resultsTable.getRow(1).getData("Payment status")).to.equal("Paid");
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
        const descriptionText = await this.interactor.getElementText("#main-content > .govuk-body");
        expect(headingText).to.equal("Service unavailable");
        expect(descriptionText).to.equal("Try again later.");
    }
}
