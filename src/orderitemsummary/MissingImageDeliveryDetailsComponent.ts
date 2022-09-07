import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {MissingImageDeliverySummary} from "./MissingImageDeliverySummary";
import {ViewModel} from "../core/ViewModel";

export class MissingImageDeliveryDetailsComponent extends AbstractViewComponent {

    constructor(private summary: MissingImageDeliverySummary) {
        super("orderItemSummary/order-item-summary-mid.njk", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data = this.summary;
        return result;
    }
}
