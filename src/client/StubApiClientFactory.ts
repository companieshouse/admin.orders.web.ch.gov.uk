import {ApiClientFactory} from "./ApiClientFactory";
import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse, ApiResult} from "@companieshouse/api-sdk-node/dist/services/resource";
import {SearchResponse} from "@companieshouse/api-sdk-node/dist/services/order/search";
import Mapping from "@companieshouse/api-sdk-node/dist/mapping/mapping";
import {Service} from "typedi";
import "reflect-metadata";
import {SearchRequest} from "@companieshouse/api-sdk-node/dist/services/order/search/types";
import ApiClient from "@companieshouse/api-sdk-node/dist/client";
import {Checkout} from "@companieshouse/api-sdk-node/dist/services/order/checkout";
import {ItemOptions} from "@companieshouse/api-sdk-node/dist/services/order/order";

@Service("stub.client")
export class StubApiClientFactory implements ApiClientFactory {
    private searchResponse: ApiResult<ApiResponse<SearchResponse>> | undefined;
    private checkoutResponse: ApiResult<ApiResponse<Checkout>> | undefined;
    private readonly defaultSearchResponse: ApiResult<ApiResponse<SearchResponse>> = new Success<ApiResponse<SearchResponse>, ApiErrorResponse>({
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
    private readonly defaultCheckoutResponse: ApiResult<ApiResponse<Checkout>> = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
        httpStatusCode: 200,
        resource: {
            paidAt: "2022-01-01T12:00:00.000Z",
            status: "paid",
            checkedOutBy: {
                id: "123456",
                email: "demo@ch.gov.uk"
            },
            links: {
                self: `/orders/ORD-123123-123123`,
                payment: `"/basket/checkouts/ORD-123123-123123/payment"`
            },
            paymentReference: "F00DFACE",
            etag: "CAFE",
            deliveryDetails: {
                addressLine1: "address line 1",
                addressLine2: "address line 2",
                country: "country",
                forename: "forename",
                locality: "locality",
                postalCode: "postal code",
                region: "region",
                surname: "surname",
                poBox: "po box"
            },
            items: [{
                id: "CRT-123456-123456",
                companyName: "TEST COMPANY LIMITED",
                companyNumber: "00000000",
                description: "certificate for company 00000000",
                descriptionIdentifier: "certificate",
                descriptionValues: {
                    certificate: "certificate for company 00000000",
                    companyNumber: "00000000"
                },
                itemCosts: [{
                    discountApplied: "0",
                    itemCost: "15",
                    calculatedCost: "15",
                    productType: "certificate"
                }],
                itemOptions: {
                    certificateType: "incorporation-with-all-name-changes",
                    deliveryMethod: "postal",
                    deliveryTimescale: "standard",
                    directorDetails: {
                        includeBasicInformation: true
                    },
                    forename: "forename",
                    includeGoodStandingInformation: true,
                    registeredOfficeAddressDetails: {
                        includeAddressRecordsType: "current-and-previous"
                    },
                    secretaryDetails: {
                        includeBasicInformation: true
                    },
                    surname: "surname",
                    companyType: "ltd"
                } as ItemOptions,
                etag: "abcdefg123456",
                kind: "item#certificate",
                links: {
                    self: "/orderable/certificates/CRT-123456-123456"
                },
                postalDelivery: true,
                quantity: 1,
                itemUri: "/orderable/certificates/CRT-123456-123456",
                status: "unknown",
                postageCost: "0",
                totalItemCost: "15",
                customerReference: "mycert",
                satisfiedAt: "2022-01-01T12:00:00.000Z"
            }],
            kind: "order",
            totalOrderCost: "15",
            reference: "ORD-123123-123123"
        }
    });

    willReturnSuccessfulSearchResponse(body: any): void {
        this.searchResponse = new Success<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: Mapping.camelCaseKeys(body)
        });
    }

    willReturnErrorSearchResponse(statusCode: number, body: any): void {
        this.searchResponse = new Failure<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: statusCode,
            errors: Mapping.camelCaseKeys(body)
        });
    }

    willReturnSuccessfulCheckoutResponse(body: any): void {
        this.checkoutResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: Mapping.camelCaseKeys(body)
        });
    }

    willReturnErrorCheckoutResponse(statusCode: number, body: any): void {
        this.checkoutResponse = new Failure<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: statusCode,
            errors: Mapping.camelCaseKeys(body)
        });
    }

    newApiClient(token: string): ApiClient {
        const self = this;
        return {
            checkout: {
                async getCheckout(checkoutId: string): Promise<ApiResult<ApiResponse<Checkout>>> {
                    return self.checkoutResponse || self.defaultCheckoutResponse;
                }
            },
            checkoutSearchService: {
                async search(request: SearchRequest): Promise<ApiResult<ApiResponse<SearchResponse>>> {
                    return self.searchResponse || self.defaultSearchResponse;
                }
            }
        } as ApiClient;
    }
}
