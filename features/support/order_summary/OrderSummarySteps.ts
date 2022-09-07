import "reflect-metadata";
import {binding, given, then, when} from "cucumber-tsflow/dist";
import {AnticipateOrderSummary, NoPage, OrderSummaryPage, OrderSummaryPageState} from "./OrderSummaryPage";
import {DataTable} from "@cucumber/cucumber";
import {BrowserAgent} from "../core/BrowserAgent";
import Container from "typedi";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";
import successfulCheckoutResponse from "../stubbing/order_summary/checkout_with_all_item_combos.json";
import checkoutNoDeliverableItems from "../stubbing/order_summary/checkout_with_no_deliverable_items.json";

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

    @given(/^The checkout contains all known item types with all known delivery timescales$/)
    async checkoutResourceContainsItems() {
        await this.currentPage.anticipateSuccessfulResponse(successfulCheckoutResponse);
    }

    @given(/^The checkout contains no deliverable items$/)
    async checkoutResourceContainsNoDeliverableItemsItems() {
        await this.currentPage.anticipateSuccessfulResponse(checkoutNoDeliverableItems);
    }

    @given(/^The checkout does not exist$/)
    async checkoutResourceNonexistent() {
        await this.currentPage.anticipateClientError({
            error: "Not found"
        });
    }

    @given(/^An error will occur when the checkout is fetched$/)
    async checkoutResourceErrors() {
        await this.currentPage.anticipateServerError({
            error: "Something went wrong"
        });
    }

    @when(/^I view the order summary$/)
    async viewOrderSummary() {
        await this.currentPage.openOrderSummaryPage();
    }

    @then(/^The following items should be displayed:$/)
    async verifyItemsDisplayed(expectedItems: DataTable) {
        await this.currentPage.verifyItems(expectedItems.rows())
    }

    @then(/^Delivery details for the order should be:$/)
    async verifyDeliveryDetailsDisplayed(expectedDeliveryDetails: DataTable) {
        await this.currentPage.verifyDeliveryDetails(expectedDeliveryDetails.raw());
    }

    @then(/^Delivery details for the order should not be displayed$/)
    async verifyDeliveryDetailsNotDisplayed() {
        await this.currentPage.verifyNoDeliveryDetailsDisplayed();
    }

    @then(/Payment details for the order should be:/)
    async verifyPaymentDetails(expectedPaymentDetails: DataTable) {
        await this.currentPage.verifyPaymentDetails(expectedPaymentDetails.raw());
    }

    @then(/The order summary page should display order not found/)
    async verifyOrderNotFoundDisplayed() {
        await this.currentPage.verifyNotFoundErrorDisplayed();
    }

    @then(/The order summary page should display service unavailable/)
    async verifyServiceUnavailableDisplayed() {
        await this.currentPage.verifyServiceUnavailableErrorDisplayed();
    }
}
