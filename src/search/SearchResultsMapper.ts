import {SearchResponse} from "@companieshouse/api-sdk-node/dist/services/order/search";
import {SearchResults} from "./SearchResults";
import {ApiResponse, ApiResult} from "@companieshouse/api-sdk-node/dist/services/resource";
import {Service} from "typedi";
import "reflect-metadata";
import {Status} from "../core/Status";
import {OrderSummary} from "./OrderSummary";
import {OrderSummary as OrderSummaryResource} from "@companieshouse/api-sdk-node/dist/services/order/search/types";
import {createLogger} from "@companieshouse/structured-logging-node";

@Service()
export class SearchResultsMapper {
    private static readonly logger = createLogger("SearchResultsMapper");

    map(response: ApiResult<ApiResponse<SearchResponse>>): SearchResults {
        if (response.isSuccess()) {
            return {
                status: Status.SUCCESS,
                orderSummaries: (response.value.resource?.orderSummaries.map(summary => {
                    return {
                        id: summary.id,
                        detailHref: this.mapLink(summary),
                        orderDate: summary.orderDate,
                        email: summary.email,
                        productLine: summary.productLine,
                        paymentStatus: this.mapPaymentStatus(summary),
                        extraProperties: {
                            companyNumber: summary.companyNumber
                        }
                    }
                }) || []) as OrderSummary[]
            } as SearchResults;
        } else {
            SearchResultsMapper.logger.error("Search endpoint returned HTTP [" + response.value.httpStatusCode + "] with error(s): '" + (response.value.errors || []).map(error => error.error).join(", ") + "'");
            return {
                status: Status.SERVER_ERROR
            } as SearchResults;
        }
    }

    private mapLink(summary: OrderSummaryResource): string | undefined {
        if (summary.productLine === "Certificate" && summary.paymentStatus === "paid") {
            return `/orders-admin/order/${summary.id}`;
        } else {
            return undefined;
        }
    }

    private mapPaymentStatus(summary: OrderSummaryResource): string {
        return summary.paymentStatus.charAt(0).toUpperCase() + summary.paymentStatus.slice(1).replace(/-/g, " ");
    }
}
