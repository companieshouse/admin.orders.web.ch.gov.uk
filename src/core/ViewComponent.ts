import {ViewModel} from "./ViewModel";

export interface ViewComponent {
    add(pageComponent: ViewComponent): void;
    render(): ViewModel;
}
