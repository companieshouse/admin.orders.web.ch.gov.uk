import "reflect-metadata";
import {binding, given, then, when} from "cucumber-tsflow/dist";
import {
    AnticipateItemNotFound,
    AnticipateOrderItemSummaryPage, AnticipateServiceUnavailable, BackFromOrderItemSummary, ItemNotFound,
    NoPage,
    OrderItemSummary,
    OrderItemSummaryPageState, ServiceUnavailable
} from "./OrderItemSummaryPage";
import {DataTable} from "@cucumber/cucumber";
import certifiedCopyStandard from "../stubbing/certified_copy_summary/paid_checkout_certified_copy_standard_delivery.json";
import certifiedCopyExpress from "../stubbing/certified_copy_summary/paid_checkout_certified_copy_express_delivery.json";
import certifiedCopyUnhandledDescription from "../stubbing/certified_copy_summary/paid_checkout_certified_copy_unhandled_description.json";
import missingImageDelivery from "../stubbing/missing_image_delivery_item_summary/missing_image_delivery.json";
import missingImageDeliveryUnhandledDescription from "../stubbing/missing_image_delivery_item_summary/missing_image_delivery_unhandled_description.json";
import certificateActiveDefault from "../stubbing/certificate_summary/paid_checkout_certificate_default_active.json";
import certificateAdministratedDefault from "../stubbing/certificate_summary/paid_checkout_certificate_default_adm.json";
import certificateLiquidatedDefault from "../stubbing/certificate_summary/paid_checkout_certificate_default_liq.json";
import certificateDissolvedDefault from "../stubbing/certificate_summary/paid_checkout_certificate_default_dissolved.json";
import certificateActiveLLP from "../stubbing/certificate_summary/paid_checkout_certificate_llp_active.json";
import certificateAdministratedLLP from "../stubbing/certificate_summary/paid_checkout_certificate_llp_admin.json";
import certificateLiquidatedLLP from "../stubbing/certificate_summary/paid_checkout_certificate_llp_liq.json";
import certificateDissolvedLLP from "../stubbing/certificate_summary/paid_checkout_certificate_llp_dissolved.json";
import certificateActiveLP from "../stubbing/certificate_summary/paid_checkout_certificate_lp_active.json";
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
    readonly backFromOrderItemSummary: OrderItemSummaryPageState;

    currentState: OrderItemSummaryPageState;

    constructor(browserAgent: BrowserAgent = Container.get(process.env.agent || "selenium"), apiFactory: StubApiClientFactory = Container.get("stub.client")) {
        this.anticipateOrderItemSummary = new AnticipateOrderItemSummaryPage(this, browserAgent);
        this.anticipateItemNotFound = new AnticipateItemNotFound(this, browserAgent);
        this.anticipateServiceUnavailable = new AnticipateServiceUnavailable(this, browserAgent);
        this.orderItemSummary = new OrderItemSummary(this, browserAgent);
        this.itemNotFound = new ItemNotFound(this, browserAgent);
        this.serviceUnavailable = new ServiceUnavailable(this, browserAgent);
        this.backFromOrderItemSummary = new BackFromOrderItemSummary(this, browserAgent);
        this.currentState = new NoPage(this, apiFactory);
    }

    @given(/^The item is a certified copy with standard delivery requested$/)
    async expectCertifiedCopyWithStandardDelivery() {
        await this.currentState.anticipateSuccessfulResponse(certifiedCopyStandard);
    }

    @given(/^The item is of type missing image delivery$/)
    async expectMissingImageDeliveryItem() {
        await this.currentState.anticipateSuccessfulResponse(missingImageDelivery);
    }

    @given(/^The item is a certificate requested for an active limited company$/)
    async expectCertificateForActiveLimitedCompany() {
        await this.currentState.anticipateSuccessfulResponse(certificateActiveDefault);
    }

    @given(/^The item is a certificate requested for an administrated limited company$/)
    async expectCertificateForAdministratedLimitedCompany() {
        await this.currentState.anticipateSuccessfulResponse(certificateAdministratedDefault);
    }

    @given(/^The item is a certificate requested for a liquidated limited company$/)
    async expectCertificateForLiquidatedLimitedCompany() {
        await this.currentState.anticipateSuccessfulResponse(certificateLiquidatedDefault);
    }

    @given(/^The item is a certificate requested for a dissolved limited company$/)
    async expectCertificateForDissolvedLimitedCompany() {
        await this.currentState.anticipateSuccessfulResponse(certificateDissolvedDefault);
    }

    @given(/^The item is a certificate requested for an active LLP/)
    async expectCertificateForActiveLLP() {
        await this.currentState.anticipateSuccessfulResponse(certificateActiveLLP);
    }

    @given(/^The item is a certificate requested for an administrated LLP$/)
    async expectCertificateForAdministratedLLP() {
        await this.currentState.anticipateSuccessfulResponse(certificateAdministratedLLP);
    }

    @given(/^The item is a certificate requested for a liquidated LLP$/)
    async expectCertificateForLiquidatedLLP() {
        await this.currentState.anticipateSuccessfulResponse(certificateLiquidatedLLP);
    }

    @given(/^The item is a certificate requested for a dissolved LLP$/)
    async expectCertificateForDissolvedLLP() {
        await this.currentState.anticipateSuccessfulResponse(certificateDissolvedLLP);
    }

    @given(/^The item is a certificate requested for an active limited partnership$/)
    async expectCertificateForActiveLimitedPartnership() {
        await this.currentState.anticipateSuccessfulResponse(certificateActiveLP);
    }

    @given(/^The (certificate|certified copy|missing image delivery) order item summary page will load successfully$/)
    async expectOrderItemSummaryToLoad(itemType: string) {
        if (itemType === "certificate") {
            await this.expectCertificateForActiveLimitedCompany();
        } else if (itemType === "certified copy") {
            await this.expectCertifiedCopyWithStandardDelivery();
        } else if (itemType === "missing image delivery") {
            await this.expectMissingImageDeliveryItem();
        }
        await this.currentState.openPageViaLink();
    }

    @given(/^The item is a certified copy with express delivery requested$/)
    async expectCertifiedCopyWithExpressDelivery() {
        await this.currentState.anticipateSuccessfulResponse(certifiedCopyExpress);
    }

    @given(/^The item is a (certified copy|missing image delivery) with an unhandled description$/)
    async expectCertifiedCopyWithUnhandledDescription(itemType: string) {
        if (itemType === "certified copy") {
            await this.currentState.anticipateSuccessfulResponse(certifiedCopyUnhandledDescription)
        } else if (itemType === "missing image delivery") {
            await this.currentState.anticipateSuccessfulResponse(missingImageDeliveryUnhandledDescription);
        }
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

    @given(/^I am viewing a (certificate|certified copy|missing image delivery) order item summary$/)
    async setupAndOpenOrderItemSummaryPage(itemType: string) {
        if (itemType === "certificate") {
            await this.expectCertificateForActiveLimitedCompany();
        } else if (itemType === "certified copy") {
            await this.expectCertifiedCopyWithStandardDelivery();
        } else if (itemType === "missing image delivery") {
            await this.expectMissingImageDeliveryItem();
        }
        await this.openOrderItemSummaryPage(itemType);
    }

    @when(/^I view the (certificate|certified copy|missing image delivery) order item summary$/)
    async openOrderItemSummaryPage(itemType: string) {
        await this.currentState.openPage(itemType);
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

    @then(/^The order item summary page should display order not found$/)
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
