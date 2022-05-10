import {ViewModel} from "./ViewModel";

export interface ErrorPageBuildable {
    buildServiceUnavailable(): ViewModel;
    buildUnauthorised(): ViewModel;
    buildNotFound(): ViewModel;
}
