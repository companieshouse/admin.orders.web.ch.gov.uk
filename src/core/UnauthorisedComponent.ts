import {AbstractViewComponent} from "./AbstractViewComponent";

export class UnauthorisedComponent extends AbstractViewComponent {
    constructor() {
        super("unauthorised.njk", []);
    }
}
