import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {ViewModel} from "../core/ViewModel";
import { OrderDetails } from "./OrderDetails";

export class PaymentDetailsComponent extends AbstractViewComponent {
    constructor(private orderDetails: OrderDetails) {
        super("orderDetails/payment_details_component.njk", []);
    }

    render(): ViewModel {
        const model = super.render();
        model.data = this.orderDetails.paymentDetails;
        return model;
    }
}
