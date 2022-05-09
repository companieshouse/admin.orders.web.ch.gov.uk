import { ApiClientFactory } from "../client/ApiClientFactory";
import { Inject, Service } from "typedi";
import { OrderDetailsParameters } from "./OrderDetailsParameters";
import { OrderDetailsResults } from "./OrderDetailsResults";
import { OrderDetailsMapperFactory } from "./OrderDetailsMapperFactory";
import { CertificateItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { Status } from "core/Status";
import "reflect-metadata";

@Service()
export class OrderDetailsService {
    constructor(@Inject((process.env.ADMIN_ORDERS_DEVELOPMENT_MODE === "true" ? "stub.client" : "default.client")) public apiClientFactory: ApiClientFactory,
                @Inject() public factory: OrderDetailsMapperFactory) {
    }
    async fetchOrder(orderDetailsParameters: OrderDetailsParameters): Promise<OrderDetailsResults> {
        const apiClient = this.apiClientFactory.newApiClient(orderDetailsParameters.token);
        const response = await apiClient.checkout.getCheckout(orderDetailsParameters.orderId);
        if (response.isSuccess()) {
            const companyType: string = (response.value.resource?.items[0].itemOptions as CertificateItemOptions).companyType;
            return this.factory.getOrDefault(companyType).map(response)
        } 
        return { status: Status.SERVER_ERROR } as OrderDetailsResults;
    }
}