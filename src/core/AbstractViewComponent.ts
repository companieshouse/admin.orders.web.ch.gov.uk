import {ViewComponent} from "./ViewComponent";
import {ViewModel} from "./ViewModel";

export abstract class AbstractViewComponent implements ViewComponent {
    protected constructor(protected template: string, protected readonly controls: ViewComponent[] = []) {
    }

    add(pageComponent: ViewComponent): void {
        this.controls.push(pageComponent);
    }

    render(): ViewModel {
        return new ViewModel(this.template, this.controls.map(control => control.render()));
    }
}
