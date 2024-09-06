import {SearchResponse} from "@companieshouse/api-sdk-node/dist/services/order/search";
import {SearchResults} from "./SearchResults";
import {ApiResponse, ApiResult} from "@companieshouse/api-sdk-node/dist/services/resource";
import {Service} from "typedi";
import "reflect-metadata";
import {Status} from "../core/Status";
import {CheckoutSummary as CheckoutSummaryResource} from "@companieshouse/api-sdk-node/dist/services/order/search/types";
import {createLogger} from "@companieshouse/structured-logging-node";
import dayjs from "dayjs";
import {FEATURE_FLAGS} from "../config/FeatureOptions";

const productLineMappings: {[key: string]: string} = {
    "item#certificate": "Certificate",
    "item#certified-copy": "Certified copy",
    "item#missing-image-delivery": "Missing image"
};

const paymentStatusMappings: {[key: string]: string} = {
    "paid": "Paid",
    "failed": "Failed",
    "pending": "Pending",
    "expired": "Expired",
    "in-progress": "In progress",
    "cancelled": "Cancelled",
    "no-funds": "No funds",
    "free": "Free (Admin Order)"
};

@Service()
export class SearchResultsMapper {
    private static readonly logger = createLogger("SearchResultsMapper");

    map(response: ApiResult<ApiResponse<SearchResponse>>): SearchResults {
        if (response.isSuccess()) {
            return {
                status: Status.SUCCESS,
                totalOrders: response.value.resource?.totalOrders || 0,
                orderSummaries: (response.value.resource?.orderSummaries.map(summary => {
                    return {
                        id: summary.id,
                        detailHref: this.mapLink(summary),
                        orderDate: this.mapOrderDate(summary),
                        email: summary.email,
                        productLine: this.mapProductLine(summary),
                        paymentStatus: this.mapPaymentStatus(summary),
                        extraProperties: this.mapExtraProperties(summary)
                    }
                }) || [])
            };
        } else {
            SearchResultsMapper.logger.error("Search endpoint returned HTTP [" + response.value.httpStatusCode + "] with error(s): '" + (response.value.errors || []).map(error => error.error).join(", ") + "'");
            return {
                status: Status.SERVER_ERROR
            } as SearchResults;
        }
    }

    private mapLink(summary: CheckoutSummaryResource): string {
        if (FEATURE_FLAGS.multiItemBasketEnabled) {
            return `/orders-admin/order-summaries/${summary.id}`;
        } else if (summary.productLine === "item#certificate" && summary.paymentStatus === "paid") {
            return `/orders-admin/orders/${summary.id}`;
        } else {
            return "";
        }
    }

    private mapOrderDate(summary: CheckoutSummaryResource): string {
        if (!summary.orderDate) {
            return "Unknown";
        }
        const date = Date.parse(summary.orderDate);
        return dayjs(date).format("DD/MM/YYYY");
    }

    private mapProductLine(summary: CheckoutSummaryResource): string | undefined {
        if (FEATURE_FLAGS.multiItemBasketEnabled) {
            return undefined;
        }
        return productLineMappings[summary.productLine] || "Unknown";
    }

    private mapPaymentStatus(summary: CheckoutSummaryResource): string {
        return paymentStatusMappings[summary.paymentStatus] || "Unknown";
    }

    private mapExtraProperties(summary: CheckoutSummaryResource): { [key: string]: string } {
        const result: {[key: string]: string} = {};
        if (!FEATURE_FLAGS.multiItemBasketEnabled) {
            result.companyNumber = summary.companyNumber;
        }
        return result;
    }
}
