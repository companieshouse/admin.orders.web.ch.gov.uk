import { ApiClientFactory } from "../client/ApiClientFactory";
import { Inject, Service } from "typedi";
import { OrderDetailsParameters } from "./OrderDetailsParameters";
import { OrderDetailsResults } from "./OrderDetailsResults";
import { OrderDetailsMapper } from "./OrderDetailsMapper";

@Service()
export class OrderDetailsService implements OrderService {
    constructor(@Inject((process.env.ADMIN_ORDERS_DEVELOPMENT_MODE === "true" ? "stub.client" : "default.client")) public apiClientFactory: ApiClientFactory, private detailsMapper: OrderDetailsMapper) {
    }
    async fetchOrder(orderDetailsParameters: OrderDetailsParameters): Promise<OrderDetailsResults> {
        const apiClient = this.apiClientFactory.newApiClient(orderDetailsParameters.token);
        const response = await apiClient.checkout.getCheckout(orderDetailsParameters.orderId);
        return this.detailsMapper.map(response);
    }
}

export interface OrderService {
    fetchOrder(orderDetailsParameters: OrderDetailsParameters): Promise<OrderDetailsResults>;
}