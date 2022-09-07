import { OrderItemMapper } from "./OrderItemMapper";
import { OrderItemView } from "./OrderItemView";
import { ItemOptions as CertifiedCopyItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certified-copies";
import { MapperRequest } from "../mappers/MapperRequest";
import {GovUkOrderCertifiedCopyItemSummaryView} from "./GovUkOrderCertifiedCopyItemSummaryView";
import { DISPATCH_DAYS } from "../config/EnvironmentProperties";
import { mapFilingHistory, mapFilingHistoryDate } from "../mappers/FilingHistoryMapper";

export class CertifiedCopyMapper implements OrderItemMapper {
    private readonly data: GovUkOrderCertifiedCopyItemSummaryView;

    constructor (private mapperRequest: MapperRequest) {
        this.data = new GovUkOrderCertifiedCopyItemSummaryView();
    }

    map (): void {
        this.data.orderDetails.orderId = this.mapperRequest.orderId;
        this.data.orderDetails.itemId = this.mapperRequest.item.id;
        this.mapItemDetails();
        this.data.orderDetails.backLinkUrl = `/orders/${this.mapperRequest.orderId}`;
        this.mapDocumentDetails();
    }

    getMappedOrder (): OrderItemView {
        return {
            template: "order-item-summary-ccd",
            data: this.data
        };
    }

    private mapItemDetails (): void {
        this.data.orderDetails.itemDetails.entries.push(
            {
                key: {
                    classes: "govuk-!-width-one-third",
                    text: "Company name"
                },
                value: {
                    classes: "govuk-!-width-two-thirds",
                    text: this.mapperRequest.item.companyName
                }
            },
            {
                key: {
                    classes: "govuk-!-width-one-third",
                    text: "Company number"
                },
                value: {
                    classes: "govuk-!-width-two-thirds",
                    text: this.mapperRequest.item.companyNumber
                }
            },
            {
                key: {
                    classes: "govuk-!-width-one-third",
                    text: "Delivery method"
                },
                value: {
                    classes: "govuk-!-width-two-thirds",
                    text: this.mapDeliveryMethod(this.mapperRequest.item.itemOptions) || ""
                }
            }
        );
    }

    private mapDocumentDetails (): void {
        const itemOptions = this.mapperRequest.item.itemOptions as CertifiedCopyItemOptions;
        this.data.documentDetails.push([
            {
                text: mapFilingHistoryDate(itemOptions.filingHistoryDocuments[0].filingHistoryDate)
            },
            {
                text: itemOptions.filingHistoryDocuments[0].filingHistoryType
            },
            {
                text: mapFilingHistory(
                    itemOptions.filingHistoryDocuments[0].filingHistoryDescription,
                    itemOptions.filingHistoryDocuments[0].filingHistoryDescriptionValues || {}
                )
            },
            {
                text: `£${this.mapperRequest.item.totalItemCost}`
            }
        ]);
    }

    private mapDeliveryMethod = (itemOptions: Record<string, any>): string | null => {
        if (itemOptions?.deliveryTimescale === "standard") {
            return "Standard delivery (aim to dispatch within " + DISPATCH_DAYS + " working days)";
        }
        if (itemOptions?.deliveryTimescale === "same-day") {
            return "Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day)";
        }
        return null;
    }
}
