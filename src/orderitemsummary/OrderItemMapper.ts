import {ViewModel} from "../core/ViewModel";

export interface OrderItemMapper {
    map(): void;
    getMappedOrder(): ViewModel;
}
