import {OrderItemSummarySteps} from "./OrderItemSummarySteps";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";
import {BrowserAgent} from "../core/BrowserAgent";
import {expect} from "chai";

export interface OrderItemSummaryPageState {
    anticipateSuccessfulResponse(json: any): Promise<void>;
    anticipateClientError(json: any): Promise<void>;
    anticipateServerError(json: any): Promise<void>;
    openPage(itemType: string): Promise<void>;
    openPageViaLink(): Promise<void>;
    verifyPageLayout(): Promise<void>;
    verifyItemDetails(expected: string[][]): Promise<void>;
    verifyDocumentDetails(expected: string[][]): Promise<void>;
    verifyItemNotFound(): Promise<void>;
    verifyServiceUnavailable(): Promise<void>;
    verifyLocation(expected: string): Promise<void>;
    clickBackLink(): Promise<void>;
    clickSignOut(): Promise<void>;
}

export abstract class AbstractOrderItemSummaryPageState implements OrderItemSummaryPageState {

    constructor(protected stateMachine: OrderItemSummarySteps) {
    }

    anticipateClientError(json: any): Promise<void> {
        throw new Error("Unsupported operation");
    }

    anticipateServerError(json: any): Promise<void> {
        throw new Error("Unsupported operation");
    }

    anticipateSuccessfulResponse(json: any): Promise<void> {
        throw new Error("Unsupported operation");
    }

    clickBackLink(): Promise<void> {
        throw new Error("Unsupported operation");
    }

    clickSignOut(): Promise<void> {
        throw new Error("Unsupported operation");
    }

    openPage(itemType: string): Promise<void> {
        throw new Error("Unsupported operation");
    }

    openPageViaLink(): Promise<void> {
        throw new Error("Unsupported operation");
    }

    verifyDocumentDetails(expected: string[][]): Promise<void> {
        throw new Error("Unsupported operation");
    }

    verifyItemDetails(expected: string[][]): Promise<void> {
        throw new Error("Unsupported operation");
    }

    verifyPageLayout(): Promise<void> {
        throw new Error("Unsupported operation");
    }

    verifyItemNotFound(): Promise<void> {
        throw new Error("Unsupported operation");
    }

    verifyServiceUnavailable(): Promise<void> {
        throw new Error("Unsupported operation");
    }

    verifyLocation(expected: string): Promise<void> {
        throw new Error("Unsupported operation");
    }
}

export class NoPage extends AbstractOrderItemSummaryPageState {

    constructor(stateMachine: OrderItemSummarySteps, private stubApiClient: StubApiClientFactory) {
        super(stateMachine);
    }

    async anticipateSuccessfulResponse(json: any): Promise<void> {
        this.stubApiClient.willReturnSuccessfulCheckoutItemResponse(json);
        this.stateMachine.currentState = this.stateMachine.anticipateOrderItemSummary;
    }

    async anticipateClientError(json: any): Promise<void> {
        this.stubApiClient.willReturnErrorCheckoutItemResponse(404, json);
        this.stateMachine.currentState = this.stateMachine.anticipateItemNotFound;
    }

    async anticipateServerError(json: any): Promise<void> {
        this.stubApiClient.willReturnErrorCheckoutItemResponse(500, json);
        this.stateMachine.currentState = this.stateMachine.anticipateServiceUnavailable;
    }
}

export class AbstractAnticipateOrderItemSummary extends AbstractOrderItemSummaryPageState {
    constructor(stateMachine: OrderItemSummarySteps, protected interactor: BrowserAgent) {
        super(stateMachine);
    }

    async openPage(itemType: string): Promise<void> {
        if (itemType === "certified copy") {
            await this.interactor.openPage("/orders-admin/order-summaries/ORD-123123-123123/items/CCD-123123-123123");
        } else if (itemType === "missing image delivery") {
            await this.interactor.openPage("/orders-admin/order-summaries/ORD-123123-123123/items/MID-123123-123123");
        }
    }

    async openPageViaLink(): Promise<void> {
        this.stateMachine.currentState = this.stateMachine.orderItemSummary;
    }
}

export class AnticipateOrderItemSummaryPage extends AbstractAnticipateOrderItemSummary {

    constructor(stateMachine: OrderItemSummarySteps, interactor: BrowserAgent) {
        super(stateMachine, interactor);
    }

    async openPage(itemType: string): Promise<void> {
        await super.openPage(itemType);
        this.stateMachine.currentState = this.stateMachine.orderItemSummary;
    }
}

export class AnticipateItemNotFound extends AbstractAnticipateOrderItemSummary {
    constructor(stateMachine: OrderItemSummarySteps, interactor: BrowserAgent) {
        super(stateMachine, interactor);
    }

    async openPage(itemType: string): Promise<void> {
        await super.openPage(itemType);
        this.stateMachine.currentState = this.stateMachine.itemNotFound;
    }
}

export class AnticipateServiceUnavailable extends AbstractAnticipateOrderItemSummary {
    constructor(stateMachine: OrderItemSummarySteps, interactor: BrowserAgent) {
        super(stateMachine, interactor);
    }

    async openPage(itemType: string): Promise<void> {
        await super.openPage(itemType);
        this.stateMachine.currentState = this.stateMachine.serviceUnavailable;
    }
}

export class OrderItemSummary extends AbstractOrderItemSummaryPageState {

    constructor(stateMachine: OrderItemSummarySteps, private interactor: BrowserAgent) {
        super(stateMachine);
    }

    async clickBackLink(): Promise<void> {
        await this.interactor.clickElement(".govuk-back-link");
        this.stateMachine.currentState = this.stateMachine.backFromOrderItemSummary;
    }

    async clickSignOut(): Promise<void> {
        await this.interactor.clickElement(".sign-out-link");
    }

    async verifyPageLayout(): Promise<void> {
        expect(await this.interactor.getElementText("h1")).to.equal("CCD-123123-123123");
    }

    async verifyItemDetails(expected: string[][]): Promise<void> {
        const resultList = await this.interactor.getList("#itemDetailsList");
        expect(resultList.getNames()).to.deep.equal(expected[0]);
        expect(resultList.getValues()).to.deep.equal(expected[1]);
    }

    async verifyDocumentDetails(expected: string[][]): Promise<void> {
        const resultsTable = await this.interactor.getTable(".govuk-table");
        for (const [index, element] of resultsTable.tableRows.entries()) {
            expect(element.getValues()).to.deep.equal(expected[index]);
        }
    }
}

export class ItemNotFound extends AbstractOrderItemSummaryPageState {

    constructor(stateMachine: OrderItemSummarySteps, private interactor: BrowserAgent) {
        super(stateMachine);
    }

    async verifyItemNotFound(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        const bodyText = await this.interactor.getElementText("#main-content p.govuk-body");
        expect(headingText).to.equal("Order not found");
        expect(bodyText).to.equal("Check that you have entered the correct web address or try using the search.");
    }
}

export class ServiceUnavailable extends AbstractOrderItemSummaryPageState {

    constructor(stateMachine: OrderItemSummarySteps, private interactor: BrowserAgent) {
        super(stateMachine);
    }

    async verifyServiceUnavailable(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        expect(headingText).to.equal("Service unavailable");
    }
}

export class BackFromOrderItemSummary extends AbstractOrderItemSummaryPageState {

    constructor(stateMachine: OrderItemSummarySteps, private interactor: BrowserAgent) {
        super(stateMachine);
    }

    async verifyLocation(expected: string): Promise<void> {
        expect(await this.interactor.getLocation()).to.equal(expected);
    }
}
