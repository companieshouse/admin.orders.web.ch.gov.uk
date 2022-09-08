import {OrderSummarySteps} from "./OrderSummarySteps";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";
import {BrowserAgent} from "../core/BrowserAgent";
import { expect } from "chai";

export interface OrderSummaryPageState {
    anticipateSuccessfulResponse(json: any): Promise<void>;
    anticipateClientError(json: any): Promise<void>;
    anticipateServerError(json: any): Promise<void>;
    openOrderSummaryPage(): Promise<void>;
    openOrderSummaryPageViaLink(): Promise<void>;
    clickBackLink(): Promise<void>;
    clickSignOut(): Promise<void>;
    verifyLayout(): Promise<void>;
    verifyItems(expectedItems: string[][]): Promise<void>;
    verifyDeliveryDetails(expectedDeliveryDetails: string[][]): Promise<void>;
    verifyNoDeliveryDetailsDisplayed(): Promise<void>;
    verifyPaymentDetails(expectedPaymentDetails: string[][]): Promise<void>;
    verifyNotFoundErrorDisplayed(): Promise<void>;
    verifyServiceUnavailableErrorDisplayed(): Promise<void>;
    verifyLocation(expected: string): Promise<void>;
}

export abstract class AbstractSummaryPage implements OrderSummaryPageState {
    constructor(protected stateMachine: OrderSummarySteps) {
    }

    anticipateSuccessfulResponse(json: any): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateClientError(json: any): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateServerError(json: any): Promise<void> {
        throw new Error("Invalid operation");
    }

    openOrderSummaryPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    openOrderSummaryPageViaLink(): Promise<void> {
        throw new Error("Invalid operation");
    }

    clickBackLink(): Promise<void> {
        throw new Error("Invalid operation");
    }

    clickSignOut(): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyDeliveryDetails(expectedDeliveryDetails: string[][]): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyNoDeliveryDetailsDisplayed(): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyLayout(): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyItems(expectedItems: string[][]): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyPaymentDetails(expectedPaymentDetails: string[][]): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyNotFoundErrorDisplayed(): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyServiceUnavailableErrorDisplayed(): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyLocation(expected: string): Promise<void> {
        throw new Error("Invalid operation");
    }
}

export class NoPage extends AbstractSummaryPage {
    constructor(stateMachine: OrderSummarySteps, private stubApiClient: StubApiClientFactory) {
        super(stateMachine);
    }

    async anticipateSuccessfulResponse(json: any): Promise<void> {
        this.stubApiClient.willReturnSuccessfulCheckoutResponse(json);
        this.stateMachine.currentPage = this.stateMachine.anticipateOrderSummary;
    }

    async anticipateClientError(json: any): Promise<void> {
        this.stubApiClient.willReturnErrorCheckoutResponse(404, json);
        this.stateMachine.currentPage = this.stateMachine.anticipateOrderSummary;
    }

    async anticipateServerError(json: any): Promise<void> {
        this.stubApiClient.willReturnErrorCheckoutResponse(500, json);
        this.stateMachine.currentPage = this.stateMachine.anticipateOrderSummary;
    }
}

export class AnticipateOrderSummary extends AbstractSummaryPage {
    constructor(stateMachine: OrderSummarySteps, private interactor: BrowserAgent) {
        super(stateMachine);
    }

    async openOrderSummaryPage(): Promise<void> {
        await this.interactor.openPage("/orders-admin/order-summaries/ORD-123123-123123");
        this.stateMachine.currentPage = this.stateMachine.orderSummary;
    }

    async openOrderSummaryPageViaLink(): Promise<void> {
        this.stateMachine.currentPage = this.stateMachine.orderSummary;
    }
}

export class OrderSummaryPage extends AbstractSummaryPage {
    constructor(stateMachine: OrderSummarySteps, private interactor: BrowserAgent) {
        super(stateMachine);
    }

    async clickBackLink(): Promise<void> {
        await this.interactor.clickElement(".govuk-back-link");
    }

    async clickSignOut(): Promise<void> {
        await this.interactor.clickElement(".sign-out-link");
    }

    async verifyLayout(): Promise<void> {
        expect(await this.interactor.getElementText("h1")).to.equal("ORD-123123-123123");
    }

    async verifyItems(expectedItems: string[][]): Promise<void> {
        const resultsTable = await this.interactor.getTable(".govuk-table");
        for (const [index, element] of resultsTable.tableRows.entries()) {
            expect(element.getValues()).to.deep.equal(expectedItems[index]);
        }
    }

    async verifyDeliveryDetails(expectedDeliveryDetails: string[][]): Promise<void> {
        const resultList = await this.interactor.getList("#deliveryDetailsList");
        expect(resultList.getNames()).to.deep.equal(expectedDeliveryDetails[0]);
        expect(resultList.getValues()).to.deep.equal(expectedDeliveryDetails[1]);
    }

    async verifyNoDeliveryDetailsDisplayed(): Promise<void> {
        expect(await this.interactor.elementExists("#deliveryDetailsList")).to.be.false;
    }

    async verifyPaymentDetails(expectedPaymentDetails: string[][]): Promise<void> {
        const resultList = await this.interactor.getList("#paymentDetailsList");
        expect(resultList.getNames()).to.deep.equal(expectedPaymentDetails[0]);
        expect(resultList.getValues()).to.deep.equal(expectedPaymentDetails[1]);
    }

    async verifyNotFoundErrorDisplayed(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        const bodyText = await this.interactor.getElementText("#main-content p.govuk-body");
        expect(headingText).to.equal("Order not found");
        expect(bodyText).to.equal("Check that you have entered the correct web address or try using the search.");
    }

    async verifyServiceUnavailableErrorDisplayed(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        expect(headingText).to.equal("Service unavailable");
    }

    async verifyLocation(expected: string): Promise<void> {
        expect(await this.interactor.getLocation()).to.equal(expected);
    }
}
