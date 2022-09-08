import { AbstractViewComponent } from "../core/AbstractViewComponent";
import { ViewModel } from "../core/ViewModel";
import { CertifiedCopySummary } from "./CertifiedCopySummary";

export class CertifiedCopyDetailsComponent extends AbstractViewComponent {
    constructor(private summary: CertifiedCopySummary) {
        super("orderItemSummary/order_item_summary_ccd.njk", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data = this.summary;
        return result;
    }
}
