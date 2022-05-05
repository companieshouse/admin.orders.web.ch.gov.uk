import {DetailsSteps} from "./DetailsSteps";
import {BrowserAgent} from "../core/BrowserAgent";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";
import failureJson from "../stubbing/failure.json";
import { expect } from "chai";

export interface DetailsPage {
    openPage(): Promise<void>;
    anticipateValidOrder(): Promise<void>;
    anticipateInvalidOrder(): void;
    anticipateOrderNotFound(): void;
    anticipateServiceUnavailable(): void;
    clickBrowserBack(): Promise<void>;
    validateOrderDetails(data: string[][]): Promise<void>;
    validateDeliveryDetails(data: string[][]): Promise<void>;
    validatePaymentDetails(data: string[][]): Promise<void>;
    validateLocation(path: string): Promise<void>;
    validateInvalidOrderError(): Promise<void>;
    validateNotFoundError(): Promise<void>;
    validateServiceUnavailableError(): Promise<void>;
}

export abstract class AbstractDetailsPage implements DetailsPage {
    protected constructor(protected detailsSteps: DetailsSteps, protected browserAgent: BrowserAgent, protected apiClientFactory: StubApiClientFactory) {
    }

    openPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateValidOrder(): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateInvalidOrder(): void {
        throw new Error("Invalid operation");
    }

    anticipateOrderNotFound(): void {
        throw new Error("Invalid operation");
    }

    anticipateServiceUnavailable(): void {
        throw new Error("Invalid operation");
    }

    clickBrowserBack(): Promise<void> {
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

    validateLocation(path: string): Promise<void> {
        throw new Error("Invalid operation");
    }

    validateInvalidOrderError(): Promise<void> {
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

    public async openPage(): Promise<void> {
        await this.browserAgent.openPage("/orders-admin/orders/ORD-123123-123123");
        this.detailsSteps.currentPage = this.detailsSteps.detailsPageLoaded;
    }

    anticipateValidOrder(): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateInvalidOrder(): void {
        this.apiClientFactory.willReturnFailureResponse(404, failureJson);
        this.detailsSteps.currentPage = this.detailsSteps.detailsPageInvalidOrder;
    }

    anticipateOrderNotFound(): void {
        this.apiClientFactory.willReturnFailureResponse(404, failureJson);
        this.detailsSteps.currentPage = this.detailsSteps.detailsPageNotFound;
    }

    anticipateServiceUnavailable(): void {
        this.apiClientFactory.willReturnFailureResponse(503, failureJson);
        this.detailsSteps.currentPage = this.detailsSteps.detailsPageServiceUnavailable;
    }
}

export class DetailsPageLoaded extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    clickBrowserBack(): Promise<void> {
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
}

export class DetailsPageInvalidOrder extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    public async validateInvalidOrderError(): Promise<void> {
        const headingText = await this.browserAgent.getElementText("h1");
        const bodyText = await this.browserAgent.getElementText("#invalid-not-found-body");
        expect(headingText).to.equal("This page cannot be found");
        expect(bodyText).to.equal("Check that you have entered the correct web address or try using the search.");
    }
}

export class DetailsPageNotFound extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    public async validateNotFoundError(): Promise<void> {
        const headingText = await this.browserAgent.getElementText("h1");
        const bodyText = await this.browserAgent.getElementText("#page-not-found-body");
        expect(headingText).to.equal("This page cannot be found");
        expect(bodyText).to.equal("Check that you have entered the correct web address or try using the search.");
    }
}

export class DetailsPageServiceUnavailable extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    public async validateServiceUnavailableError(): Promise<void> {
        const headingText = await this.browserAgent.getElementText("h1");
        expect(headingText).to.equal("Sorry, this service is unavailable");
    }
}
