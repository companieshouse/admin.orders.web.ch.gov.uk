import { ApiClientFactory } from "../client/ApiClientFactory";
import { Inject, Service } from "typedi";
import { OrderDetailsParameters } from "./OrderDetailsParameters";
import { OrderDetailsResults } from "./OrderDetailsResults";
import { OrderDetailsMapperFactory } from "./OrderDetailsMapperFactory";
import "reflect-metadata";

@Service()
export class OrderDetailsService {
    constructor(@Inject((process.env.ADMIN_ORDERS_DEVELOPMENT_MODE === "true" ? "stub.client" : "default.client")) public apiClientFactory: ApiClientFactory,
                @Inject() public factory: OrderDetailsMapperFactory) {
    }
    async fetchOrder(orderDetailsParameters: OrderDetailsParameters): Promise<OrderDetailsResults> {
        const apiClient = this.apiClientFactory.newApiClient(orderDetailsParameters.token);
        const response = await apiClient.checkout.getCheckout(orderDetailsParameters.orderId);
        return this.factory.getOrDefault(response).map(response) 
    }
}