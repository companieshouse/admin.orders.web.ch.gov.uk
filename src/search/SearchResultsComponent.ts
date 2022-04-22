import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {SearchResultComponent} from "./SearchResultComponent";
import {ViewModel} from "../core/ViewModel";

export class SearchResultsComponent extends AbstractViewComponent {
    private readonly limit: number;
    private readonly size: number;

    constructor(results: SearchResultComponent[],
                private readonly noResultsTemplate: string = "search/no_results_found.njk",
                limit: number = 1000) {
        super("search/search_results.njk", results);
        this.limit = Math.min(results.length, limit);
        this.size = results.length;
    }

    render(): ViewModel {
        const result = super.render();
        if (this.size == 0) {
            result.template = this.noResultsTemplate;
        }
        result.data.limit = this.limit;
        result.data.size = this.size;
        return result;
    }
}
