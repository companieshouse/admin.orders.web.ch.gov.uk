import { OrderItemMapper } from "./OrderItemMapper";
import {ViewModel} from "../core/ViewModel";

export class NullOrderItemMapper implements OrderItemMapper {
    getMappedOrder (): ViewModel {
        throw new Error("Mapper not found");
    }

    map (): void {
        throw new Error("Mapper not found");
    }
}
