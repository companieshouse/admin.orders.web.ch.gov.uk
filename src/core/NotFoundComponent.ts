import {AbstractViewComponent} from "./AbstractViewComponent";

export class NotFoundComponent extends AbstractViewComponent {
    constructor() {
        super("not_found.njk", []);
    }
}
