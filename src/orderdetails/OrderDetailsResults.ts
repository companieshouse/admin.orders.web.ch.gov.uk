import { Status } from "core/Status";
import { OrderDetails } from "./OrderDetails";

export class OrderDetailsResults {
    constructor(public readonly status: Status, public readonly model: OrderDetails) {
        
    }
}