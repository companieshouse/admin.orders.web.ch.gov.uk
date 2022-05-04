import {DetailsSteps} from "./DetailsSteps";
import {BrowserAgent} from "../core/BrowserAgent";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";

export interface DetailsPage {
    openPage(): Promise<void>;
    anticipateValidOrder(): Promise<void>;
    anticipateInvalidOrder(): Promise<void>;
    anticipateOrderNotFound(): Promise<void>;
    anticipateServiceUnavailable(): Promise<void>;
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

    anticipateInvalidOrder(): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateOrderNotFound(): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateServiceUnavailable(): Promise<void> {
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

    openPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateValidOrder(): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateInvalidOrder(): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateOrderNotFound(): Promise<void> {
        throw new Error("Invalid operation");
    }

    anticipateServiceUnavailable(): Promise<void> {
        throw new Error("Invalid operation");
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

    validateInvalidOrderError(): Promise<void> {
        throw new Error("Invalid operation");
    }
}

export class DetailsPageNotFound extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    validateNotFoundError(): Promise<void> {
        throw new Error("Invalid operation");
    }
}

export class DetailsPageServiceUnavailable extends AbstractDetailsPage {
    constructor(detailsSteps: DetailsSteps, browserAgent: BrowserAgent, apiClientFactory: StubApiClientFactory) {
        super(detailsSteps, browserAgent, apiClientFactory);
    }

    validateServiceUnavailableError(): Promise<void> {
        throw new Error("Invalid operation");
    }
}
