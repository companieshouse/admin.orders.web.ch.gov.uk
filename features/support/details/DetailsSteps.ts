import {binding, given, then, when} from "cucumber-tsflow/dist";
import "reflect-metadata";
import {
    DetailsPage,
    DetailsPageInvalidOrder,
    DetailsPageLoaded,
    DetailsPageNotFound,
    DetailsPageNotLoaded,
    DetailsPageServiceUnavailable
} from "./DetailsPage";
import {BrowserAgent} from "../core/BrowserAgent";
import Container from "typedi";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";
import {DataTable} from "@cucumber/cucumber";

@binding()
export class DetailsSteps {
    readonly detailsPageLoaded: DetailsPageLoaded;
    readonly detailsPageInvalidOrder: DetailsPageInvalidOrder;
    readonly detailsPageNotFound: DetailsPageNotFound;
    readonly detailsPageServiceUnavailable: DetailsPageServiceUnavailable;

    public currentPage: DetailsPage;

    constructor(browserAgent: BrowserAgent = Container.get(process.env.agent || "selenium"), apiClientFactory: StubApiClientFactory = Container.get("stub.client")) {
        this.detailsPageLoaded = new DetailsPageLoaded(this, browserAgent, apiClientFactory);
        this.detailsPageInvalidOrder = new DetailsPageInvalidOrder(this, browserAgent, apiClientFactory);
        this.detailsPageNotFound = new DetailsPageNotFound(this, browserAgent, apiClientFactory);
        this.detailsPageServiceUnavailable = new DetailsPageServiceUnavailable(this, browserAgent, apiClientFactory);
        this.currentPage = new DetailsPageNotLoaded(this, browserAgent, apiClientFactory);
    }

    @given(/^The checkout endpoint will return an order that is a paid certificate$/)
    async anticipateValidOrder(): Promise<void> {
        await this.currentPage.anticipateValidOrder();
    }

    @given(/^The checkout endpoint will return an order that is not a paid certificate$/)
    async anticipateInvalidOrder(): Promise<void> {
        await this.currentPage.anticipateInvalidOrder();
    }

    @given(/^The checkout endpoint will return HTTP 404 Not Found$/)
    async anticipateOrderNotFound(): Promise<void> {
        await this.currentPage.anticipateOrderNotFound();
    }

    @given(/^The checkout endpoint will return a server error$/)
    async anticipateServiceUnavailable(): Promise<void> {
        await this.currentPage.anticipateServiceUnavailable();
    }

    @when(/^I view order details$/)
    async openPage(): Promise<void> {
        await this.currentPage.openPage();
    }

    @when(/^I click the browser back button$/)
    async clickBrowserBack(): Promise<void> {
        await this.currentPage.clickBrowserBack();
    }

    @then(/^The following order details should be displayed:$/)
    async validateOrderDetails(results: DataTable): Promise<void> {
        await this.currentPage.validateOrderDetails(results.rows());
    }

    @then(/^The following delivery details should be displayed:$/)
    async validateDeliveryDetails(results: DataTable): Promise<void> {
        await this.currentPage.validateDeliveryDetails(results.rows());
    }

    @then(/^The following payment details should be displayed:$/)
    async validatePaymentDetails(results: DataTable): Promise<void> {
        await this.currentPage.validatePaymentDetails(results.rows());
    }

    // TODO:
    async validateLocation(path: string): Promise<void> {
        await this.currentPage.validateLocation(path);
    }

    @then(/^Not found should be displayed (Invalid)$/)
    async validateInvalidOrderError(): Promise<void> {
        await this.currentPage.validateInvalidOrderError();
    }

    @then(/^Not found should be displayed$/)
    async validateNotFoundError(): Promise<void> {
        await this.currentPage.validateNotFoundError();
    }

    @then(/^Service unavailable should be displayed$/)
    async validateServiceUnavailableError(): Promise<void> {
        await this.currentPage.validateServiceUnavailableError();
    }

    @when(/^I click sign out$/)
    public async clickSignOut(): Promise<void> {
        await this.currentPage.clickSignOut();
    }
}
