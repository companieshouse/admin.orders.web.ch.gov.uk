import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {SearchResultComponent} from "./SearchResultComponent";
import {ViewModel} from "../core/ViewModel";

export class SearchResultsComponent extends AbstractViewComponent {
    private readonly pageSize: number;

    constructor(results: SearchResultComponent[],
                private readonly total: number,
                private readonly noResultsTemplate: string = "search/no_results_found.njk") {
        super("search/search_results.njk", results);
        this.pageSize = results.length;
    }

    render(): ViewModel {
        const result = super.render();
        if (this.total == 0) {
            result.template = this.noResultsTemplate;
        }
        result.data.pageSize = this.pageSize;
        result.data.total = this.total;
        return result;
    }
}
