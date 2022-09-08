import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {ViewModel} from "../core/ViewModel";
import {ItemSummary, OrderSummary} from "./OrderSummary";

export class OrderSummaryPage extends AbstractViewComponent {
    constructor(private title: string) {
        super("page", []);
    }

    render(): ViewModel {
        const model = super.render();
        model.data.title = this.title;
        return model;
    }
}

export class OrderSummaryDetailsComponent extends AbstractViewComponent {
    constructor(private orderSummary: OrderSummary) {
        super("orderSummary/order_summary.njk", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data = this.orderSummary;
        return result;
    }
}

export class ItemDetailsComponent extends AbstractViewComponent {
    constructor(private itemSummary: ItemSummary) {
        super("orderSummary/item_details.njk", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data = this.itemSummary;
        return result;
    }
}

export class DeliveryDetailsComponent extends AbstractViewComponent {
    constructor(private orderSummary: OrderSummary) {
        super("orderSummary/delivery_details.njk", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data = this.orderSummary.deliveryDetails;
        return result;
    }
}

export class PaymentDetailsComponent extends AbstractViewComponent {
    constructor(private orderSummary: OrderSummary) {
        super("orderSummary/payment_details.njk", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data = this.orderSummary.paymentDetails;
        return result;
    }
}
