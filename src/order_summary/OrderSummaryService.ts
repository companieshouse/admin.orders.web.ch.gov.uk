import {Inject, Service} from "typedi";
import {OrderSummary} from "./OrderSummary";
import {OrderSummaryDirector} from "./OrderSummaryDirector";
import {OrderSummaryConverter} from "./OrderSummaryConverter";
import {ApiClientFactory} from "../client/ApiClientFactory";
import {Status} from "../core/Status";
import "reflect-metadata";

export interface OrderSummaryFetchable {
    fetchOrderSummary(orderId: string, token: string): Promise<OrderSummaryResult>;
}

@Service()
export class OrderSummaryService implements OrderSummaryFetchable {

    constructor(@Inject((process.env.ADMIN_ORDERS_DEVELOPMENT_MODE === "true" ? "stub.client" : "default.client")) public apiClientFactory: ApiClientFactory) {
    }

    async fetchOrderSummary(orderId: string, token: string): Promise<OrderSummaryResult> {
        const apiClient = this.apiClientFactory.newApiClient(token);
        const checkout = await apiClient.checkout.getCheckout(orderId);
        if (checkout.isFailure()) {
            if (checkout.value.httpStatusCode == 404 && checkout.value?.errors) {
                return new OrderSummaryResult(Status.CLIENT_ERROR);
            } else {
                return new OrderSummaryResult(Status.SERVER_ERROR);
            }
        } else {
            const converter = new OrderSummaryConverter();
            const mapper = new OrderSummaryDirector(converter);
            mapper.mapOrderSummary(checkout.value.resource!);
            return new OrderSummaryResult(Status.SUCCESS, converter.getOrderSummary());
        }
    }
}

export class OrderSummaryResult {

    constructor(public status: Status, public summary?: OrderSummary) {
    }
}
