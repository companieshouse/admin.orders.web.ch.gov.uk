import { OrderItemMapper } from "./OrderItemMapper";
import { CertificateItemSummaryView } from "./CertificateItemSummaryView";
import { MapperRequest } from "../mappers/MapperRequest";
import { ItemOptions as CertificateItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certificates";
import {ViewModel} from "../core/ViewModel";
import {Page} from "../core/Page";
import {CertificateDetailsComponent} from "./CertificateDetailsComponent";
import {CertificateTextMapper} from "../orderdetails/CertificateTextMapper";
import {Item} from "../../../api-sdk-node/dist/services/order/order";

export abstract class AbstractCertificateMapper implements OrderItemMapper {
    protected readonly data: CertificateItemSummaryView

    constructor (protected mapperRequest: MapperRequest) {
        this.data = new CertificateItemSummaryView();
    }

    map (): void {
        const item: Item = this.mapperRequest.checkout.items[0];
        this.data.orderId = this.mapperRequest.orderId;
        this.mapCompanyDetails(item);
        this.mapCertificateDetails();
        this.mapDeliveryDetails(item);
        this.mapFee(item);
        this.data.backLinkUrl = "javascript:history.back()";
    }

    getMappedOrder (): ViewModel {
        const page = new Page(`Summary of item ${this.mapperRequest.checkout.items[0].id} in order ${this.mapperRequest.orderId}`);
        page.add(new CertificateDetailsComponent(this.data));
        return page.render();
    }

    protected abstract mapCertificateDetails(): void;

    protected addField(key: string, value: string): void {
        this.data.itemDetails.push({key, value});
    }

    private mapCompanyDetails(item: Item): void {
        this.addField("Item number", item.id);
        this.addField("Company name", item.companyName);
        this.addField("Company number", item.companyNumber);
    }

    private mapDeliveryDetails(item: Item): void {
        const itemOptions = item.itemOptions as CertificateItemOptions;
        this.addField("Delivery method", CertificateTextMapper.mapDeliveryMethod(itemOptions) || "");
        this.addField("Delivery address", CertificateTextMapper.mapDeliveryDetails(this.mapperRequest.checkout.deliveryDetails));
        this.addField("Email copy required", CertificateTextMapper.mapEmailCopyRequired(itemOptions));
        this.addField("Email address", this.mapperRequest.checkout.checkedOutBy.email);
    }

    private mapFee(item: Item): void {
        this.addField("Fee", `£${item.totalItemCost}`);
    }
}
