import { OrderItemMapper } from "./OrderItemMapper";
import { ItemOptions as MissingImageDeliveryItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/mid";
import { MapperRequest } from "../mappers/MapperRequest";
import {Page} from "../core/Page";
import {MissingImageDeliverySummary} from "./MissingImageDeliverySummary";
import {MissingImageDeliveryDetailsComponent} from "./MissingImageDeliveryDetailsComponent";
import {ViewModel} from "../core/ViewModel";
import {FilingHistoryMapper} from "../mappers/FilingHistoryMapper";
import {Item} from "../../../api-sdk-node/dist/services/order/order";

export class MissingImageDeliveryMapper implements OrderItemMapper {
    private readonly data: MissingImageDeliverySummary;

    constructor (private mapperRequest: MapperRequest, private filingHistoryMapper: FilingHistoryMapper) {
        this.data = new MissingImageDeliverySummary();
    }

    map (): void {
        const item: Item = this.mapperRequest.checkout.items[0];
        this.data.orderId = this.mapperRequest.orderId;
        this.data.itemId = item.id;
        this.mapItemDetails(item);
        this.data.backLinkUrl = "javascript:history.back()";
    }

    getMappedOrder (): ViewModel {
        const result = new Page(`Summary of item ${this.data.itemId} in order ${this.data.orderId}`);
        result.add(new MissingImageDeliveryDetailsComponent(this.data));
        return result.render();
    }

    private mapItemDetails (item: Item): void {
        const itemOptions = item.itemOptions as MissingImageDeliveryItemOptions;
        this.data.companyName = item.companyName;
        this.data.companyNumber = item.companyNumber;
        this.data.date = this.filingHistoryMapper.mapFilingHistoryDate(itemOptions.filingHistoryDate, false);
        this.data.type = itemOptions.filingHistoryType;
        this.data.description = this.filingHistoryMapper.mapFilingHistory(itemOptions.filingHistoryDescription, itemOptions.filingHistoryDescriptionValues);
        this.data.fee = `£${item.totalItemCost}`;
    }
}
