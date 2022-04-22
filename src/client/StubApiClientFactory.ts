import {ApiClientFactory} from "./ApiClientFactory";
import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse, ApiResult} from "@companieshouse/api-sdk-node/dist/services/resource";
import {SearchResponse} from "@companieshouse/api-sdk-node/dist/services/order/search";
import Mapping from "@companieshouse/api-sdk-node/dist/mapping/mapping";
import {Service} from "typedi";
import "reflect-metadata";
import {SearchRequest} from "@companieshouse/api-sdk-node/dist/services/order/search/types";
import ApiClient from "@companieshouse/api-sdk-node/dist/client";

@Service("stub.client")
export class StubApiClientFactory implements ApiClientFactory {
    private response: ApiResult<ApiResponse<SearchResponse>> | undefined;
    private readonly defaultResponse: ApiResult<ApiResponse<SearchResponse>> = new Success<ApiResponse<SearchResponse>, ApiErrorResponse>({
        httpStatusCode: 200,
        resource: {
            totalOrders: 2,
            orderSummaries: [{
                id: "ORD-123123-123123",
                email: "demo@ch.gov.uk",
                productLine: "item#certificate",
                orderDate: "11/04/2022",
                companyNumber: "12345678",
                paymentStatus: "paid",
                links: {
                    self: {
                        link: "/order/ORD-123123-123123"
                    }
                }
            }, {
                id: "ORD-321321-321321",
                email: "demo@ch.gov.uk",
                productLine: "item#missing-image-delivery",
                orderDate: "11/04/2022",
                companyNumber: "87654321",
                paymentStatus: "paid",
                links: {
                    self: {
                        link: "/order/ORD-123123-123123"
                    }
                }
            }]
        }
    });

    willReturnSuccessfulResponse(body: any): void {
        this.response = new Success<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: Mapping.camelCaseKeys(body)
        });
    }

    willReturnFailureResponse(statusCode: number, body: any): void {
        this.response = new Failure<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: statusCode,
            errors: Mapping.camelCaseKeys(body)
        });
    }

    newApiClient(): ApiClient {
        const self = this;
        return {
            orderSearchService: {
                async search(request: SearchRequest): Promise<ApiResult<ApiResponse<SearchResponse>>> {
                    return self.response || self.defaultResponse;
                }
            }
        } as ApiClient;
    }
}
