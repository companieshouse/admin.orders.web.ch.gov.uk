import {OrderSummary} from "./OrderSummary";
import {ItemOptionsDeliveryTimescaleConfigurable} from "@companieshouse/api-sdk-node/dist/services/order/types";
import {MapperRequest} from "../core/MapperRequest";
import {CertificateTextMapper} from "../orderdetails/CertificateTextMapper";
import {Checkout} from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";

const paymentStatusMappings: {[key: string]: string} = {
    "paid": "Paid",
    "failed": "Failed",
    "pending": "Pending",
    "expired": "Expired",
    "in-progress": "In progress",
    "cancelled": "Cancelled",
    "no-funds": "No funds"
};

export class OrderSummaryConverter {

    private orderSummary: OrderSummary = new OrderSummary();

    mapOrderDetails(checkout: Checkout): void {
        this.orderSummary.orderReference = checkout.reference;
        this.mapDeliveryAddress(checkout);
        this.mapPaymentDetails(checkout);
        this.orderSummary.backLinkUrl = "javascript:history.back()";
    }

    mapCertificate(request: MapperRequest): void {
        this.mapItem(request, "Certificate", this.mapDeliveryMethod(request.item.itemOptions as ItemOptionsDeliveryTimescaleConfigurable));
        this.orderSummary.hasDeliverableItems = true;
    }

    mapCertifiedCopy(request: MapperRequest): void {
        this.mapItem(request, "Certified document", this.mapDeliveryMethod(request.item.itemOptions as ItemOptionsDeliveryTimescaleConfigurable));
        this.orderSummary.hasDeliverableItems = true;
    }

    mapMissingImageDelivery(request: MapperRequest): void {
        this.mapItem(request, "Missing image", "N/A");
    }

    getOrderSummary(): OrderSummary {
        return this.orderSummary;
    }

    private mapItem(request: MapperRequest, itemType: string, deliveryMethod: string): void {
        this.orderSummary.itemSummary.push({
            id: request.item.id,
            orderType: itemType,
            companyNumber: request.item.companyNumber,
            deliveryMethod: deliveryMethod,
            fee: `£${request.item.totalItemCost}`,
            itemLink: `/orders-admin/order-summaries/${request.orderId}/items/${request.item.id}`
        });
    }

    private mapDeliveryAddress(checkout: Checkout) {
        this.orderSummary.deliveryDetails = {
            deliveryAddress: CertificateTextMapper.mapDeliveryDetails(checkout.deliveryDetails)
        };
    }

    private mapPaymentDetails(checkout: Checkout) {
        this.orderSummary.paymentDetails = {
            paymentStatus: this.mapPaymentStatus(checkout.status),
            paymentReference: checkout.paymentReference || "",
            amountPaid: `£${checkout.totalOrderCost}`
        };
    }

    private mapDeliveryMethod(itemOptions: ItemOptionsDeliveryTimescaleConfigurable): string {
        if (itemOptions.deliveryTimescale === "standard") {
            return "Standard";
        } else if (itemOptions.deliveryTimescale === "same-day") {
            return "Express";
        } else {
            return "";
        }
    }

    private mapPaymentStatus(paymentStatus: string): string {
        return paymentStatusMappings[paymentStatus] || "Unknown";
    }
}
