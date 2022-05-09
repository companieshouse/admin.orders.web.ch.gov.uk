import { Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { ApiResult, ApiResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { OrderDetailsResults } from "./OrderDetailsResults";


export interface OrderDetailsMapper {
    map(response: ApiResult<ApiResponse<Checkout>>): OrderDetailsResults;
}