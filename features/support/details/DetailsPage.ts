import {DetailsSteps} from "./DetailsSteps";
import {BrowserAgent} from "../core/BrowserAgent";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";
import failureJson from "../stubbing/failure.json";
import { expect } from "chai";

export interface DetailsPage {
    openPage(): Promise<void>;
    anticipateValidOrder(body: any): void;
    anticipateInvalidOrder(body: any): void;
    anticipateOrderNotFound(): void;
    anticipateServiceUnavailable(): void;
    validateOrderDetails(data: string[][]): Promise<void>;
    validateDeliveryDetails(data: string[][]): Promise<void>;
    validatePaymentDetails(data: string[][]): Promise<void>;
    validateNotFoundError(): Promise<void>;
    validateServiceUnavailableError(): Promise<void>;
}

export abstract class AbstractDetailsPage implements DetailsPage {
    protected constructor(protected detailsSteps: DetailsSteps, protected browserAgent: BrowserAgent, protected apiClientFactory: StubApiClientFactory) {
    }

    public async openPage(): Promise<void> {
        await this.browserAgent.openPage("/orders-admin/orders/ORD-123123-123123");
    }

    anticipateValidOrder(body: any): void {
        throw new Error("Invalid operation");
    }

    anticipateInvalidOrder(body: any): void {
        throw new Error("Invalid operation");
    }

    anticipateOrderNotFound(): void {
        throw new Error("Invalid operation");
    }

    anticipateServiceUnavailable(): void {
        throw new Error("Invalid operation");
    }

    validateOrderDetails(data: string[][]): Promise<void> {
        throw new Error("Invalid operation");
    }

    validateDeliveryDetails(data: string[][]): Promise<void> {
        throw new Error("Invalid operation");
    }

    validatePaymentDetails(data: string[][]): Promise<void> {
        throw new Error("Invalid operation");
    }

    validateNotFoundError(): Promise<void> {
        throw new Error("Invalid operation");
    }

    validateServiceUnavailableError(): Promise<void> {
        throw new Error("Invalid operation");
    }
}

export class DetailsPageNotLoaded extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    anticipateValidOrder(body: any): void {
        this.apiClientFactory.willReturnSuccessfulCheckoutResponse(body);
        this.detailsSteps.currentPage = this.detailsSteps.detailsPageLoaded;
    }

    anticipateInvalidOrder(body: any): void {
        this.apiClientFactory.willReturnSuccessfulCheckoutResponse(body);
        this.detailsSteps.currentPage = this.detailsSteps.detailsPageNotFound;
    }

    anticipateOrderNotFound(): void {
        this.apiClientFactory.willReturnErrorCheckoutResponse(404, failureJson);
        this.detailsSteps.currentPage = this.detailsSteps.detailsPageNotFound;
    }

    anticipateServiceUnavailable(): void {
        this.apiClientFactory.willReturnErrorCheckoutResponse(503, failureJson);
        this.detailsSteps.currentPage = this.detailsSteps.detailsPageServiceUnavailable;
    }
}

export class DetailsPageLoaded extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    public async validateOrderDetails(data: string[][]): Promise<void> {
        const resultList = await this.browserAgent.getList("#orderDetailsList");
        expect(resultList.getNames()).to.deep.equal(data[0]);
        expect(resultList.getValues()).to.deep.equal(data[1]);
    }

    public async validateDeliveryDetails(data: string[][]): Promise<void> {
        const resultList = await this.browserAgent.getList("#deliveryDetailsList");
        expect(resultList.getNames()).to.deep.equal(data[0]);
        expect(resultList.getValues()).to.deep.equal(data[1]);
    }

    public async validatePaymentDetails(data: string[][]): Promise<void> {
        const resultList = await this.browserAgent.getList("#paymentDetailsList");
        expect(resultList.getNames()).to.deep.equal(data[0]);
        expect(resultList.getValues()).to.deep.equal(data[1]);
    }
}

export class DetailsPageNotFound extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    public async validateNotFoundError(): Promise<void> {
        const headingText = await this.browserAgent.getElementText("h1");
        const bodyText = await this.browserAgent.getElementText("#main-content p.govuk-body");
        expect(headingText).to.equal("Order not found");
        expect(bodyText).to.equal("Check that you have entered the correct web address or try using the search.");
    }
}

export class DetailsPageServiceUnavailable extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    public async validateServiceUnavailableError(): Promise<void> {
        const headingText = await this.browserAgent.getElementText("h1");
        expect(headingText).to.equal("Service unavailable");
    }
}
