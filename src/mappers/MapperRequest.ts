import {Checkout} from "@companieshouse/api-sdk-node/src/services/order/checkout";
import {Item} from "@companieshouse/api-sdk-node/src/services/order/order";

export class MapperRequest {
    constructor (public orderId: string, public checkout: Checkout) {
    }
}
