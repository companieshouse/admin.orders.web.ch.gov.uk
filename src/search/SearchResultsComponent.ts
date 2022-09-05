import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {ViewModel} from "../core/ViewModel";
import {ViewComponent} from "../core/ViewComponent";

export class SearchResultsComponent extends AbstractViewComponent {
    private readonly pageSize: number;

    constructor(results: ViewComponent[],
                private readonly total: number,
                template: string = "search/search_results.njk",
                private readonly noResultsTemplate: string = "search/no_results_found.njk") {
        super(template, results);
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
