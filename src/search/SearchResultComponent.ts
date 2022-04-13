import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {OrderSummary} from "./OrderSummary";
import {ViewModel} from "../core/ViewModel";

export class SearchResultComponent extends AbstractViewComponent {
    constructor(private orderSummary: OrderSummary) {
        super("search/search_result.njk", []);
    }

    render(): ViewModel {
        const model = super.render();
        model.data = this.orderSummary;
        return model;
    }
}
