import { ApiResult, ApiResponse, ApiErrorResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { OrderDetailsMapper } from "./OrderDetailsMapper";
import { OrderDetailsResults } from "./OrderDetailsResults";
import { CertificateTextMapper } from "./CertificateTextMapper";
import { Status } from "core/Status";
import { Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { createLogger } from "@companieshouse/structured-logging-node";
import { Success } from "@companieshouse/api-sdk-node/dist/services/result";

export abstract class AbstractOrderDetailsMapper implements OrderDetailsMapper {

    private static readonly logger = createLogger("AbstractErrorMapper");

    map(response: ApiResult<ApiResponse<Checkout>>): OrderDetailsResults {
        if (response.isSuccess() && (response.value.resource?.items[0].kind !== CertificateTextMapper.ITEM_KIND_CERTIFICATE || response.value.resource?.status !== "paid")) {
            AbstractOrderDetailsMapper.logger.error(`Order ${response.value.resource?.reference} is not a paid certificate`);
            return {
                status: Status.CLIENT_ERROR
            } as OrderDetailsResults; 
        } else if (response.isFailure() && response.value.httpStatusCode === 404) {
            AbstractOrderDetailsMapper.logger.error("Order not found");
            return {
                status: Status.CLIENT_ERROR
            } as OrderDetailsResults;    
        }  else if (response.isFailure()) {
            AbstractOrderDetailsMapper.logger.error("Checkout endpoint returned HTTP [" + response.value.httpStatusCode + "] with error(s): '" + (response.value.errors || []).map(error => error.error).join(", ") + "'");
            return {
                status: Status.SERVER_ERROR
            } as OrderDetailsResults;
        } else {
            return this.mapSuccessfulResponse(response);
        }
    }

    abstract mapSuccessfulResponse(response: Success<ApiResponse<Checkout>, ApiErrorResponse>): OrderDetailsResults;
}
