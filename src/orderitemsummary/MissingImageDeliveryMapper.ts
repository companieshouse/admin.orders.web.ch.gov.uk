import { OrderItemMapper } from "./OrderItemMapper";
import { ItemOptions as MissingImageDeliveryItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/mid";
import { MapperRequest } from "../mappers/MapperRequest";
import {Page} from "../core/Page";
import {MissingImageDeliverySummary} from "./MissingImageDeliverySummary";
import {MissingImageDeliveryDetailsComponent} from "./MissingImageDeliveryDetailsComponent";
import {ViewModel} from "../core/ViewModel";
import {FilingHistoryMapper} from "../mappers/FilingHistoryMapper";

export class MissingImageDeliveryMapper implements OrderItemMapper {
    private readonly data: MissingImageDeliverySummary;

    constructor (private mapperRequest: MapperRequest, private filingHistoryMapper: FilingHistoryMapper) {
        this.data = new MissingImageDeliverySummary();
    }

    map (): void {
        this.data.orderId = this.mapperRequest.orderId;
        this.data.itemId = this.mapperRequest.item.id;
        this.mapItemDetails();
        this.data.backLinkUrl = "javascript:history.back()";
    }

    getMappedOrder (): ViewModel {
        const result = new Page(`Summary of item ${this.data.itemId} in order ${this.data.orderId}`);
        result.add(new MissingImageDeliveryDetailsComponent(this.data));
        return result.render();
    }

    private mapItemDetails (): void {
        const itemOptions = this.mapperRequest.item.itemOptions as MissingImageDeliveryItemOptions;
        this.data.companyName = this.mapperRequest.item.companyName;
        this.data.companyNumber = this.mapperRequest.item.companyNumber;
        this.data.date = this.filingHistoryMapper.mapFilingHistoryDate(itemOptions.filingHistoryDate, false);
        this.data.type = itemOptions.filingHistoryType;
        this.data.description = this.filingHistoryMapper.mapFilingHistory(itemOptions.filingHistoryDescription, itemOptions.filingHistoryDescriptionValues);
        this.data.fee = `£${this.mapperRequest.item.totalItemCost}`;
    }
}
