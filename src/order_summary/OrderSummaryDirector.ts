import {OrderSummaryConverter} from "./OrderSummaryConverter";
import {Checkout} from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";

export class OrderSummaryDirector {

    private converter: OrderSummaryConverter;

    constructor(converter: OrderSummaryConverter) {
        this.converter = converter;
    }

    mapOrderSummary(checkout: Checkout): void {
        for (const item of checkout.items) {
            if (item.kind === "item#certificate") {
                this.converter.mapCertificate({
                    orderId: checkout.reference,
                    item: item
                });
            } else if (item.kind === "item#certified-copy") {
                this.converter.mapCertifiedCopy({
                    orderId: checkout.reference,
                    item: item
                });
            } else if (item.kind === "item#missing-image-delivery") {
                this.converter.mapMissingImageDelivery({
                    orderId: checkout.reference,
                    item: item
                });
            }
        }
        this.converter.mapOrderDetails(checkout);
    }
}
