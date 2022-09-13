import { AbstractViewComponent } from "../core/AbstractViewComponent";
import { ViewModel } from "../core/ViewModel";
import { CertifiedCopySummary } from "./CertifiedCopySummary";

export class CertifiedCopyItemDetailsComponent extends AbstractViewComponent {
    constructor(private summary: CertifiedCopySummary) {
        super("orderItemSummary/certified_copy_item_details_component.njk", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data = this.summary;
        return result;
    }
}
