import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {ViewModel} from "../core/ViewModel";
import { optionFilter } from "./OptionFilter";
import { OrderDetails } from "./OrderDetails";

export class OrderDetailsComponent extends AbstractViewComponent {
    constructor(private orderDetails: OrderDetails) {
        super("orderDetails/order_details_component.njk", []);
    }

    render(): ViewModel {
        const model = super.render();
        model.data = this.orderDetails.certificateDetails
        model.data.optionFilter = optionFilter
        return model;
    }
}
