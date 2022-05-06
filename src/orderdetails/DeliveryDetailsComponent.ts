import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {ViewModel} from "../core/ViewModel";
import { OrderDetails } from "./OrderDetails";

export class DeliveryDetailsComponent extends AbstractViewComponent {
    constructor(private orderDetails: OrderDetails) {
        super("delivery_details_component.njk", []);
    }

    render(): ViewModel {
        const model = super.render();
        model.data = this.orderDetails.deliveryInfo
        return model;
    }
}
