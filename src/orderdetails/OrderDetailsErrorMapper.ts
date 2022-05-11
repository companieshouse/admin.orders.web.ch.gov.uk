import { AbstractOrderDetailsMapper } from "./AbstractOrderDetailsMapper";
import { Success } from "@companieshouse/api-sdk-node/dist/services/result";
import { ApiResponse, ApiErrorResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { OrderDetailsResults } from "./OrderDetailsResults";

export class OrderDetailsErrorMapper extends AbstractOrderDetailsMapper {
    mapSuccessfulResponse(response: Success<ApiResponse<Checkout>, ApiErrorResponse>): OrderDetailsResults  {
        throw new Error("Tried to map a successful response with NullOrderDetailsMapper");
    }
}
