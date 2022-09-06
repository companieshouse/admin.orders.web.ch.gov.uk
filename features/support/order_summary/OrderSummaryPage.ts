import {OrderSummarySteps} from "./OrderSummarySteps";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";
import successfulCheckoutResponse from "../stubbing/order_summary/checkout_with_all_item_combos.json";
import {BrowserAgent} from "../core/BrowserAgent";
import { expect } from "chai";

export interface OrderSummaryPageState {
    anticipateSuccessfulResponse(): Promise<void>;
    openOrderSummaryPage(): Promise<void>;
    verifyLayout(): Promise<void>;
    verifyItems(expectedItems: string[][]): Promise<void>;
    verifyDeliveryDetails(expectedDeliveryAddress: string): Promise<void>;
    verifyPaymentDetails(expectedPaymentDetails: string[][]): Promise<void>;
}

export abstract class AbstractSummaryPage implements OrderSummaryPageState {
    protected constructor(protected stateMachine: OrderSummarySteps) {
    }

    anticipateSuccessfulResponse(): Promise<void> {
        throw new Error("Invalid operation");
    }

    openOrderSummaryPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    verifyDeliveryDetails(expectedDeliveryAddress: string): Promise<void> {
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
}

export class NoPage extends AbstractSummaryPage {
    constructor(stateMachine: OrderSummarySteps, private stubApiClient: StubApiClientFactory) {
        super(stateMachine);
    }

    async anticipateSuccessfulResponse(): Promise<void> {
        this.stubApiClient.willReturnSuccessfulCheckoutResponse(successfulCheckoutResponse);
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
}

export class OrderSummaryPage extends AbstractSummaryPage {
    constructor(stateMachine: OrderSummarySteps, private interactor: BrowserAgent) {
        super(stateMachine);
    }

    async verifyLayout(): Promise<void> {
        expect(await this.interactor.getElementText("h1")).to.equal("ORD-123123-123123");
    }

    async verifyItems(expectedItems: string[][]): Promise<void> {
        const resultsTable = await this.interactor.getTable(".govuk-table");
        for (const [index, element] of resultsTable.tableRows.entries()) {
            const linkable = expectedItems[index].pop();
            expect(element.getValues()).to.deep.equal(expectedItems[index]);
            expect(linkable).to.equal(element.linkable.toString());
        }
    }

    async verifyDeliveryDetails(expectedDeliveryAddress: string): Promise<void> {
        expect(await this.interactor.getElementText("#deliveryDetails")).to.contain(expectedDeliveryAddress);
    }

    async verifyPaymentDetails(expectedPaymentDetails: string[][]): Promise<void> {
        const resultList = await this.interactor.getList("#paymentDetailsList");
        expect(resultList.getNames()).to.deep.equal(expectedPaymentDetails[0]);
        expect(resultList.getValues()).to.deep.equal(expectedPaymentDetails[1]);
    }
}
