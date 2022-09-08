import "reflect-metadata";
import {binding, given, then, when} from "cucumber-tsflow/dist";
import {
    AnticipateItemNotFound,
    AnticipateOrderItemSummaryPage, AnticipateServiceUnavailable, ItemNotFound,
    NoPage,
    OrderItemSummary,
    OrderItemSummaryPageState, ServiceUnavailable
} from "./OrderItemSummaryPage";
import {DataTable} from "@cucumber/cucumber";
import certifiedCopyStandard from "../stubbing/certified_copy_summary/certified_copy_with_standard_delivery.json";
import certifiedCopyExpress from "../stubbing/certified_copy_summary/certified_copy_with_express_delivery.json";
import certifiedCopyUnhandledDescription from "../stubbing/certified_copy_summary/certified_copy_with_unhandled_description.json";
import {BrowserAgent} from "../core/BrowserAgent";
import Container from "typedi";
import {StubApiClientFactory} from "../../../dist/client/StubApiClientFactory";

@binding()
export class OrderItemSummarySteps {
    readonly anticipateOrderItemSummary: OrderItemSummaryPageState;
    readonly anticipateItemNotFound: OrderItemSummaryPageState;
    readonly anticipateServiceUnavailable: OrderItemSummaryPageState;
    readonly orderItemSummary: OrderItemSummaryPageState;
    readonly itemNotFound: OrderItemSummaryPageState;
    readonly serviceUnavailable: OrderItemSummaryPageState;

    currentState: OrderItemSummaryPageState;

    constructor(browserAgent: BrowserAgent = Container.get(process.env.agent || "selenium"), apiFactory: StubApiClientFactory = Container.get("stub.client")) {
        this.anticipateOrderItemSummary = new AnticipateOrderItemSummaryPage(this, browserAgent);
        this.anticipateItemNotFound = new AnticipateItemNotFound(this, browserAgent);
        this.anticipateServiceUnavailable = new AnticipateServiceUnavailable(this, browserAgent);
        this.orderItemSummary = new OrderItemSummary(this, browserAgent);
        this.itemNotFound = new ItemNotFound(this, browserAgent);
        this.serviceUnavailable = new ServiceUnavailable(this, browserAgent);
        this.currentState = new NoPage(this, apiFactory);
    }

    @given(/^The item is a certified copy with standard delivery requested$/)
    async expectCertifiedCopyWithStandardDelivery() {
        await this.currentState.anticipateSuccessfulResponse(certifiedCopyStandard);
    }

    @given(/^The order item summary page will load successfully$/)
    async expectOrderItemSummaryToLoad() {
        await this.expectCertifiedCopyWithStandardDelivery();
        await this.currentState.openPageViaLink();
    }

    @given(/^The item is a certified copy with express delivery requested$/)
    async expectCertifiedCopyWithExpressDelivery() {
        await this.currentState.anticipateSuccessfulResponse(certifiedCopyExpress);
    }

    @given(/^The item is a certified copy of a document with an unhandled description$/)
    async expectCertifiedCopyWithUnhandledDescription() {
        await this.currentState.anticipateSuccessfulResponse(certifiedCopyUnhandledDescription);
    }

    @given(/^The requested order item resource does not exist$/)
    async expectOrderItemNotFound() {
        await this.currentState.anticipateClientError({
            error: "Not found"
        });
    }

    @given(/^An error will occur when the order item is fetched$/)
    async expectErrorWhenOrderItemRetrieved() {
        await this.currentState.anticipateServerError({
            error: "Something went wrong"
        });
    }

    @given(/^I am viewing an order item summary$/)
    async setupAndOpenOrderItemSummaryPage() {
        await this.expectCertifiedCopyWithStandardDelivery();
        await this.openOrderItemSummaryPage();
    }

    @when(/^I view the order item summary$/)
    async openOrderItemSummaryPage() {
        await this.currentState.openPage();
    }

    @when(/^I click the back button on the order item summary page$/)
    async clickBackButton() {
        await this.currentState.clickBackLink();
    }

    @then(/^The following item details should be displayed:$/)
    async verifyItemDetails(dataTable: DataTable) {
        await this.currentState.verifyItemDetails(dataTable.raw());
    }

    @then(/^The following document details should be displayed:$/)
    async verifyDocumentDetails(dataTable: DataTable) {
        await this.currentState.verifyDocumentDetails(dataTable.rows());
    }

    @then(/^The order item summary page should display item not found$/)
    async verifyItemNotFound() {
        await this.currentState.verifyItemNotFound();
    }

    @then(/^The order item summary page should display service unavailable$/)
    async verifyServiceUnavailable() {
        await this.currentState.verifyServiceUnavailable();
    }

    @then(/^I should be returned from the order item summary page to the order summary page$/)
    async verifyLocationIsOrderSummaryPage() {
        await this.currentState.verifyLocation("/orders-admin/order-summaries/ORD-123123-123123");
    }
}
