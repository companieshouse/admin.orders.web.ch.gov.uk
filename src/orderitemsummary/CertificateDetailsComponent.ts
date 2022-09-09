import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {ViewModel} from "../core/ViewModel";
import {CertificateItemSummaryView} from "./CertificateItemSummaryView";

export class CertificateDetailsComponent extends AbstractViewComponent {
    constructor(private summary: CertificateItemSummaryView) {
        super("orderItemSummary/order_item_summary_certificate.njk", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data = this.summary;
        return result;
    }
}
