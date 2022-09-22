import { OrderItemMapper } from "./OrderItemMapper";
import { CertificateItemSummaryView } from "./CertificateItemSummaryView";
import { MapperRequest } from "../mappers/MapperRequest";
import { ItemOptions as CertificateItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certificates";
import {ViewModel} from "../core/ViewModel";
import {Page} from "../core/Page";
import {CertificateDetailsComponent} from "./CertificateDetailsComponent";
import {CertificateTextMapper} from "../orderdetails/CertificateTextMapper";

export abstract class AbstractCertificateMapper implements OrderItemMapper {
    protected readonly data: CertificateItemSummaryView

    constructor (protected mapperRequest: MapperRequest) {
        this.data = new CertificateItemSummaryView();
    }

    map (): void {
        this.data.orderId = this.mapperRequest.orderId;
        this.mapCompanyDetails();
        this.mapCertificateDetails();
        this.mapDeliveryDetails();
        this.mapFee();
        this.data.backLinkUrl = "javascript:history.back()";
    }

    getMappedOrder (): ViewModel {
        const page = new Page(`Summary of item ${this.mapperRequest.item.id} in order ${this.mapperRequest.orderId}`);
        page.add(new CertificateDetailsComponent(this.data));
        return page.render();
    }

    protected abstract mapCertificateDetails(): void;

    protected addField(key: string, value: string): void {
        this.data.itemDetails.push({key, value});
    }

    private mapCompanyDetails(): void {
        this.addField("Item number", this.mapperRequest.item.id);
        this.addField("Company name", this.mapperRequest.item.companyName);
        this.addField("Company number", this.mapperRequest.item.companyNumber);
    }

    private mapDeliveryDetails(): void {
        const itemOptions = this.mapperRequest.item.itemOptions as CertificateItemOptions;
        this.addField("Delivery method", CertificateTextMapper.mapDeliveryMethod(itemOptions) || "");
        this.addField("Delivery address", CertificateTextMapper.mapDeliveryDetails(this.mapperRequest.checkout.deliveryDetails));
        this.addField("Email copy required", CertificateTextMapper.mapEmailCopyRequired(itemOptions));
        this.addField("Email address", this.mapperRequest.checkout.checkedOutBy.email);
    }

    private mapFee(): void {
        this.addField("Fee", `£${this.mapperRequest.item.totalItemCost}`);
    }
}
