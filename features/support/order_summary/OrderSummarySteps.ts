import "reflect-metadata";
import {binding, given, then, when} from "cucumber-tsflow/dist";
import {AnticipateOrderSummary, NoPage, OrderSummaryPage, OrderSummaryPageState} from "./OrderSummaryPage";
import {DataTable} from "@cucumber/cucumber";
import {BrowserAgent} from "../core/BrowserAgent";
import Container from "typedi";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";

@binding()
export class OrderSummarySteps {
    readonly anticipateOrderSummary: OrderSummaryPageState;
    readonly orderSummary: OrderSummaryPageState;

    currentPage: OrderSummaryPageState;

    constructor(browserAgent: BrowserAgent = Container.get(process.env.agent || "selenium"), apiFactory: StubApiClientFactory = Container.get("stub.client")) {
        this.anticipateOrderSummary = new AnticipateOrderSummary(this, browserAgent);
        this.orderSummary = new OrderSummaryPage(this, browserAgent);
        this.currentPage = new NoPage(this, apiFactory);
    }

    @given(/^The checkout contains the following items:$/)
    async checkoutResourceContainsItems(expectedItems: DataTable) {
        await this.currentPage.anticipateSuccessfulResponse();
    }

    @when(/^I view the order summary$/)
    async viewOrderSummary() {
        await this.currentPage.openOrderSummaryPage();
    }

    @then(/^The following items should be displayed:$/)
    async verifyItemsDisplayed(expectedItems: DataTable) {
        await this.currentPage.verifyItems(expectedItems.rows())
    }

    @then(/^Delivery details for the order should be "(.+?)"$/)
    async verifyDeliveryDetailsDisplayed(expectedDeliveryDetails: string) {
        await this.currentPage.verifyDeliveryDetails(expectedDeliveryDetails);
    }

    @then(/Payment details for the order should be:/)
    async verifyPaymentDetails(expectedPaymentDetails: DataTable) {
        await this.currentPage.verifyPaymentDetails(expectedPaymentDetails.raw());
    }
}
