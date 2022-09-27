import { OrderItemMapper } from "./OrderItemMapper";
import { ItemOptions as CertifiedCopyItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certified-copies";
import { MapperRequest } from "../mappers/MapperRequest";
import { CertifiedCopySummary } from "./CertifiedCopySummary";
import { ViewModel } from "../core/ViewModel";
import { CertifiedCopyItemDetailsComponent } from "./CertifiedCopyItemDetailsComponent"
import { FilingHistoryMapper } from "../mappers/FilingHistoryMapper";
import { CertificateTextMapper } from "../orderdetails/CertificateTextMapper";
import { Page } from "../core/Page";
import {CertifiedCopyDocumentDetailsComponent} from "./CertifiedCopyDocumentDetailsComponent";
import {Item} from "@companieshouse/api-sdk-node/dist/services/order/order";

export class CertifiedCopyMapper implements OrderItemMapper {
    private readonly data: CertifiedCopySummary;

    constructor (private mapperRequest: MapperRequest, private filingHistoryMapper: FilingHistoryMapper) {
        this.data = new CertifiedCopySummary();
    }

    map (): void {
        const item: Item = this.mapperRequest.checkout.items[0];
        this.data.orderId = this.mapperRequest.orderId;
        this.data.itemId = item.id;
        this.mapItemDetails(item);
        this.mapDocumentDetails(item);
        this.data.backLinkUrl = "javascript:history.back()";
    }

    getMappedOrder (): ViewModel {
        const result = new Page(`Summary of item ${this.data.itemId} in order ${this.data.orderId}`);
        result.add(new CertifiedCopyItemDetailsComponent(this.data));
        result.add(new CertifiedCopyDocumentDetailsComponent(this.data));
        return result.render();
    }

    private mapItemDetails (item: Item): void {
        this.data.companyName = item.companyName;
        this.data.companyNumber = item.companyNumber;
        this.data.deliveryMethod = CertificateTextMapper.mapDeliveryMethod(item.itemOptions) || "";
    }

    private mapDocumentDetails (item: Item): void {
        const filingHistoryDocument = (item.itemOptions as CertifiedCopyItemOptions).filingHistoryDocuments[0];
        this.data.dateFiled = this.filingHistoryMapper.mapFilingHistoryDate(filingHistoryDocument.filingHistoryDate, false);
        this.data.type = filingHistoryDocument.filingHistoryType;
        this.data.description = this.filingHistoryMapper.mapFilingHistory(filingHistoryDocument.filingHistoryDescription,
            filingHistoryDocument.filingHistoryDescriptionValues || {});
        this.data.fee = `£${item.totalItemCost}`;
    }
}
