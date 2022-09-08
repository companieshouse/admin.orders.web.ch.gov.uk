import { AbstractViewComponent } from "../core/AbstractViewComponent";
import { ViewModel } from "../core/ViewModel";

export class CertifiedCopyItemSummaryPage extends AbstractViewComponent {

    constructor(private title: string) {
        super("page", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data.title = this.title;
        return result;
    }
}
