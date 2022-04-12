import {AbstractViewComponent} from "../core/AbstractViewComponent";
import {ViewModel} from "../core/ViewModel";

export class SearchPage extends AbstractViewComponent {
    constructor(private title: string) {
        super("page", []);
    }

    render(): ViewModel {
        const model = super.render();
        model.data.title = this.title;
        return model;
    }
}
