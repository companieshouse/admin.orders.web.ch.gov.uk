import { AbstractViewComponent } from "../core/AbstractViewComponent";
import { ViewModel } from "../core/ViewModel";
import { CertifiedCopySummary } from "./CertifiedCopySummary";

export class CertifiedCopyDocumentDetailsComponent extends AbstractViewComponent {
    constructor(private summary: CertifiedCopySummary) {
        super("orderItemSummary/certified_copy_document_details_component.njk", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data = this.summary;
        return result;
    }
}
