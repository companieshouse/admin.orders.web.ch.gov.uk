import { OrderItemRequest } from "./OrderItemRequest";
import { OrderItemView } from "./OrderItemView";
import { OrderItemSummaryFactory } from "./OrderItemSummaryFactory";

export class OrderItemSummaryService {
    constructor(private factory: OrderItemSummaryFactory = new OrderItemSummaryFactory()) {
    }

    async getOrderItem (request: OrderItemRequest): Promise<OrderItemView> {
        return undefined as any;
    }
}
