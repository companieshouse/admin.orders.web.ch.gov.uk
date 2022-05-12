import {binding, given, then, when} from "cucumber-tsflow/dist";
import "reflect-metadata";
import {
    DetailsPage,
    DetailsPageLoaded,
    DetailsPageNotFound,
    DetailsPageNotLoaded,
    DetailsPageServiceUnavailable
} from "./DetailsPage";
import {BrowserAgent} from "../core/BrowserAgent";
import Container from "typedi";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";
import {DataTable} from "@cucumber/cucumber";
import orderPageJson from "../stubbing/success_page.json"
import unpaidCertificate from "../stubbing/unpaid_certificate.json";
import notACertificate from "../stubbing/not_a_certificate.json";

@binding()
export class DetailsSteps {
    readonly detailsPageLoaded: DetailsPageLoaded;
    readonly detailsPageNotFound: DetailsPageNotFound;
    readonly detailsPageServiceUnavailable: DetailsPageServiceUnavailable;

    public currentPage: DetailsPage;

    constructor(browserAgent: BrowserAgent = Container.get(process.env.agent || "selenium"), apiClientFactory: StubApiClientFactory = Container.get("stub.client")) {
        this.detailsPageLoaded = new DetailsPageLoaded(this, browserAgent, apiClientFactory);
        this.detailsPageNotFound = new DetailsPageNotFound(this, browserAgent, apiClientFactory);
        this.detailsPageServiceUnavailable = new DetailsPageServiceUnavailable(this, browserAgent, apiClientFactory);
        this.currentPage = new DetailsPageNotLoaded(this, browserAgent, apiClientFactory);
    }

    @given(/^The checkout endpoint will return a paid certificate order$/)
    async anticipateValidOrder(): Promise<void> {
        await this.currentPage.anticipateValidOrder(orderPageJson);
    }

    @given(/^The checkout endpoint will return an unpaid certificate order$/)
    async anticipateUnpaidCertificate(): Promise<void> {
        await this.currentPage.anticipateInvalidOrder(unpaidCertificate);
    }

    @given(/^The checkout endpoint will return a certified document order$/)
    async anticipateNotACertificate(): Promise<void> {
        await this.currentPage.anticipateInvalidOrder(notACertificate);
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

    @then(/^Order not found should be displayed$/)
    async validateNotFoundError(): Promise<void> {
        await this.currentPage.validateNotFoundError();
    }

    @then(/^Service unavailable should be displayed$/)
    async validateServiceUnavailableError(): Promise<void> {
        await this.currentPage.validateServiceUnavailableError();
    }
}
