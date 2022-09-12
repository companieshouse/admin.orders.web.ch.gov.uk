import { OrderItemRequest } from "./OrderItemRequest";
import { OrderItemView } from "./OrderItemView";
import { OrderItemSummaryFactory } from "./OrderItemSummaryFactory";
import {Inject} from "typedi";
import {ApiClientFactory} from "../client/ApiClientFactory";
import {Service} from "typedi";
import "reflect-metadata";
import {MapperRequest} from "../mappers/MapperRequest";
import ApiClient from "@companieshouse/api-sdk-node/dist/client";
import {Result} from "@companieshouse/api-sdk-node/dist/services/result";
import {Item} from "@companieshouse/api-sdk-node/dist/services/order/order";
import {OrderItemErrorResponse} from "@companieshouse/api-sdk-node/dist/services/order/order-item/service";
import {createLogger} from "@companieshouse/structured-logging-node";
import {Status} from "../core/Status";

@Service()
export class OrderItemSummaryService {
    private static readonly logger = createLogger("OrderItemSummaryService");

    constructor(@Inject((process.env.ADMIN_ORDERS_DEVELOPMENT_MODE === "true" ? "stub.client" : "default.client")) public apiClientFactory: ApiClientFactory,
                @Inject() private factory: OrderItemSummaryFactory) {
    }

    async getOrderItem (request: OrderItemRequest): Promise<OrderItemView> {
        const apiClient: ApiClient = this.apiClientFactory.newApiClient(request.apiToken);
        const response: Result<Item, OrderItemErrorResponse> = await apiClient.checkoutItem.getCheckoutItem(request.orderId, request.itemId);

        if (response.isSuccess()) {
            const mapper = this.factory.getMapper(new MapperRequest(request.orderId, response.value));
            mapper.map();
            return {
                status: Status.SUCCESS,
                viewModel: mapper.getMappedOrder()
            };
        } else if (response.isFailure() && response.value.httpStatusCode === 404 &&  response.value.error) {
            OrderItemSummaryService.logger.error("Order item not found");
            return {
                status: Status.CLIENT_ERROR
            }
        } else {
            OrderItemSummaryService.logger.error("Get order item endpoint returned HTTP [" + response.value.httpStatusCode + "] with error: " + response.value.error);
            return {
                status: Status.SERVER_ERROR
            }
        }
    }
}
