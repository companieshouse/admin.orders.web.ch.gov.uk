import {Checkout} from "@companieshouse/api-sdk-node/dist/services/order/checkout";

export class MapperRequest {
    constructor (public orderId: string, public checkout: Checkout) {
    }
}
