export class OrderItemRequest {
    constructor(public readonly apiToken: string, public readonly orderId: string, public readonly itemId: string) {

    }
}
