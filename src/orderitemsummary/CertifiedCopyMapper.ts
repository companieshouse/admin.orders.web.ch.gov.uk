import { OrderItemMapper } from "./OrderItemMapper";
import { ItemOptions as CertifiedCopyItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certified-copies";
import { MapperRequest } from "../mappers/MapperRequest";
import { CertifiedCopySummary } from "./CertifiedCopySummary";
import { ViewModel } from "../core/ViewModel";
import { CertifiedCopyItemSummaryPage } from "./CertifiedCopyItemSummaryPage";
import { CertifiedCopyDetailsComponent } from "./CertifiedCopyDetailsComponent"
import { DISPATCH_DAYS } from "../config/EnvironmentProperties";
import { mapFilingHistory, mapFilingHistoryDate } from "../mappers/FilingHistoryMapper";

export class CertifiedCopyMapper implements OrderItemMapper {
    private readonly data: CertifiedCopySummary;

    constructor (private mapperRequest: MapperRequest) {
        this.data = new CertifiedCopySummary();
    }

    map (): void {
        this.data.orderId = this.mapperRequest.orderId;
        this.data.itemId = this.mapperRequest.item.id;
        this.mapItemDetails();
        this.mapDocumentDetails();
        this.data.backLinkUrl = "javascript:history.back()";
    }

    getMappedOrder (): ViewModel {
        const result = new CertifiedCopyItemSummaryPage(`Summary of item ${this.data.itemId} in order ${this.data.orderId}`);
        result.add(new CertifiedCopyDetailsComponent(this.data));
        return result.render();
    }

    private mapItemDetails (): void {
        this.data.companyName = this.mapperRequest.item.companyName;
        this.data.companyNumber = this.mapperRequest.item.companyNumber;
        this.data.deliveryMethod = this.mapDeliveryMethod(this.mapperRequest.item.itemOptions) || "";
    }

    private mapDocumentDetails (): void {
        const filingHistoryDocument =
            (this.mapperRequest.item.itemOptions as CertifiedCopyItemOptions).filingHistoryDocuments[0];
        this.data.dateFiled = mapFilingHistoryDate(filingHistoryDocument.filingHistoryDate, false);
        this.data.type = filingHistoryDocument.filingHistoryType;
        this.data.description = mapFilingHistory(filingHistoryDocument.filingHistoryDescription,
            filingHistoryDocument.filingHistoryDescriptionValues || {});
        this.data.fee = `£${this.mapperRequest.item.totalItemCost}`;
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
