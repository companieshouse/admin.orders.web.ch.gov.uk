import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {SearchCriteria} from "./SearchCriteria";
import {ViewModel} from "../core/ViewModel";

export class SearchComponent extends AbstractViewComponent {
    constructor(private searchCriteria?: SearchCriteria) {
        super("search/search_component.njk", []);
    }

    render(): ViewModel {
        const model = super.render();
        model.data = this.searchCriteria;
        return model;
    }
}
