import {AbstractViewComponent} from "./AbstractViewComponent";
import {ViewModel} from "./ViewModel";

export class Page extends AbstractViewComponent {

    constructor(private title: string) {
        super("page", []);
    }

    render(): ViewModel {
        const result = super.render();
        result.data.title = this.title;
        return result;
    }
}
