import { SearchSteps } from "./SearchSteps";
import { expect } from "chai";
import { BrowserAgent } from "../core/BrowserAgent";
import "reflect-metadata";

export interface SearchPage {
    openSearchPage(): Promise<void>;
    enterOrderId(text: string): Promise<void>;
    enterEmail(text: string): Promise<void>;
    enterCompanyNumber(text: string): Promise<void>;
    clickSearch(): Promise<void>;
    verifyLayout(): Promise<void>;
    verifyMatchingOrdersDisplayed(results: string[][]): Promise<void>;
    verifySearchCriteriaPreserved(): Promise<void>;
}

export abstract class AbstractSearchPage implements SearchPage {
    protected constructor(protected searchSteps: SearchSteps, protected interactor: BrowserAgent) {
    }

    clickSearch(): Promise<void> {
        throw new Error("Invalid operation");
    }

    enterCompanyNumber(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    enterEmail(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    enterOrderId(text: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    openSearchPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyLayout(): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyMatchingOrdersDisplayed(results: any): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifySearchCriteriaPreserved(): Promise<void> {
        throw new Error("Invalid operation");
    }
}

export class NoPage extends AbstractSearchPage {
    public constructor(searchSteps: SearchSteps, interactor: BrowserAgent) {
        super(searchSteps, interactor);
    }

    public async openSearchPage(): Promise<void> {
        await this.interactor.openPage("/orders-admin/search");
        this.searchSteps.currentPage = this.searchSteps.ordersSearchPageState;
    }
}

export class OrdersSearchPage extends AbstractSearchPage {
    public constructor(searchSteps: SearchSteps, interactor: BrowserAgent) {
        super(searchSteps, interactor);
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

    public async verifyLayout(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        expect(headingText).equals("Search for an order");
        expect(await this.interactor.elementExists("#orderNumber")).to.be.true;
        expect(await this.interactor.elementExists("#email")).to.be.true;
        expect(await this.interactor.elementExists("#companyNumber")).to.be.true;
        expect(await this.interactor.elementExists("#main-content > form > button")).to.be.true;
    }

    public async verifySearchCriteriaPreserved(): Promise<void> {
        const orderNumberValue = await this.interactor.getFieldValue("#orderNumber");
        const emailValue = await this.interactor.getFieldValue("#email");
        const companyNumberValue = await this.interactor.getFieldValue("#companyNumber");
        expect(orderNumberValue).to.equal(this.searchSteps.getValue("order_id"));
        expect(emailValue).to.equal(this.searchSteps.getValue("email"));
        expect(companyNumberValue).to.equal(this.searchSteps.getValue("company_number"));
    }
}

export class NoSearchResultsPage extends OrdersSearchPage {
    public constructor(searchSteps: SearchSteps, interactor: BrowserAgent) {
        super(searchSteps, interactor);
    }

    public async verifyLayout(): Promise<void> {
        await super.verifyLayout();
        const resultSummaryText = await this.interactor.getElementText("#main-content p.govuk-body");
        expect(resultSummaryText).to.equal("No matches found");
    }
}

export class SearchResultsPage extends OrdersSearchPage {
    public constructor(searchSteps: SearchSteps, interactor: BrowserAgent) {
        super(searchSteps, interactor);
    }

    public async verifyLayout(): Promise<void> {
        await super.verifyLayout();
        const resultSummaryText = await this.interactor.getElementText("#main-content .govuk-hint");
        expect(resultSummaryText).to.equal("Showing 2 of 2 results");
    }

    public async verifyMatchingOrdersDisplayed(results: string[][]): Promise<void> {
        const resultsTable = await this.interactor.getTable(".govuk-table");
        for (const [index, element] of resultsTable.tableRows.entries()) {
            const linkable = results[index].pop();
            expect(element.getValues()).to.deep.equal(results[index]);
            expect(linkable).to.equal(element.linkable.toString());
        }
    }
}

export class ErrorPage extends AbstractSearchPage {
    public constructor(searchSteps: SearchSteps, interactor: BrowserAgent) {
        super(searchSteps, interactor);
    }

    public async verifyLayout(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        const descriptionText = await this.interactor.getElementText("#main-content .govuk-body");
        expect(headingText).to.equal("Service unavailable");
        expect(descriptionText).to.equal("Try again later.");
    }
}
