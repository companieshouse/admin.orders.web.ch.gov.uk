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
import paidDefaultLiquidated from "../stubbing/paid_certificate_default_liq.json";
import paidDefaultActive from "../stubbing/paid_certificate_default_active.json";
import paidDefaultAdministrated from "../stubbing/paid_certificate_default_adm.json";
import paidLlpAdministrated from "../stubbing/paid_certificate_llp_admin.json";
import paidLlpActive from "../stubbing/paid_certificate_llp_active.json";
import paidLpActive from "../stubbing/paid_certificate_lp_active.json";
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

    @given(/^The checkout endpoint will return a paid certificate order for a liquidated limited company$/)
    async anticipateLiquidatedLimitedCompanyOrder(): Promise<void> {
        await this.currentPage.anticipateValidOrder(paidDefaultLiquidated);
    }

    @given(/^The checkout endpoint will return a paid certificate order for an active limited company$/)
    async anticipateActiveLimitedCompanyOrder(): Promise<void> {
        await this.currentPage.anticipateValidOrder(paidDefaultActive);
    }

    @given(/^The checkout endpoint will return a paid certificate order for an administrated limited company with no options requested$/)
    async anticipateAdministratedLimitedCompanyOrder(): Promise<void> {
        await this.currentPage.anticipateValidOrder(paidDefaultAdministrated);
    }

    @given(/^The checkout endpoint will return a paid certificate order for an administrated LLP$/)
    async anticipateAdministratedLLPOrder(): Promise<void> {
        await this.currentPage.anticipateValidOrder(paidLlpAdministrated);
    }

    @given(/^The checkout endpoint will return a paid certificate order for an active LLP$/)
    async anticipateActiveLLPOrder(): Promise<void> {
        await this.currentPage.anticipateValidOrder(paidLlpActive);
    }

    @given(/^The checkout endpoint will return a paid certificate order for an active limited partnership$/)
    async anticipateActiveLPOrder(): Promise<void> {
        await this.currentPage.anticipateValidOrder(paidLpActive);
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

    @then(/^The following order details should be displayed:$/)
    async validateOrderDetails(results: DataTable): Promise<void> {
        await this.currentPage.validateOrderDetails(results.raw());
    }

    @then(/^The following delivery details should be displayed:$/)
    async validateDeliveryDetails(results: DataTable): Promise<void> {
        await this.currentPage.validateDeliveryDetails(results.raw());
    }

    @then(/^The following payment details should be displayed:$/)
    async validatePaymentDetails(results: DataTable): Promise<void> {
        await this.currentPage.validatePaymentDetails(results.raw());
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
