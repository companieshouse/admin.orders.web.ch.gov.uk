import {Checkout} from "../../../api-sdk-node/dist/services/order/checkout";
import {Item} from "../../../api-sdk-node/dist/services/order/order";

export class MapperRequest {
    constructor (public orderId: string, public checkout: Checkout, public item: Item) {
    }
}
