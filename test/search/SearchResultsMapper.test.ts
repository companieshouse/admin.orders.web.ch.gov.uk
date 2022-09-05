import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import {CheckoutSummary as CheckoutSummaryResource, SearchResponse} from "@companieshouse/api-sdk-node/dist/services/order/search";
import {SearchResultsMapper} from "../../src/search/SearchResultsMapper";
import {OrderSummary} from "../../src/search/OrderSummary";
import {SearchResults} from "../../src/search/SearchResults";
import { Status } from "../../src/core/Status";
import {FEATURE_FLAGS} from "../../src/config/FeatureOptions";

describe("SearchResultsMapper", () => {
    afterAll(() => {
        FEATURE_FLAGS.multiItemBasketEnabled = false;
    });

    it("Maps a successful response", () => {
        // given
        FEATURE_FLAGS.multiItemBasketEnabled = false;
        const serverResponse = new Success<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                totalOrders: 10,
                orderSummaries: [{
                    id: "ORD-123123-123123",
                    email: "demo@ch.gov.uk",
                    companyNumber: "12345678",
                    productLine: "item#certificate",
                    orderDate: "2022-01-01T12:00:00.000",
                    paymentStatus: "paid",
                    links: {
                        self: {
                            link: "/orders/ORD-123123-123123"
                        }
                    }
                }, {
                    id: "ORD-321321-321321",
                    email: "demo2@ch.gov.uk",
                    companyNumber: "87654321",
                    productLine: "item#missing-image-delivery",
                    orderDate: "2021-05-05T12:00:00.000",
                    paymentStatus: "paid",
                    links: {
                        self: {
                            link: "/orders/ORD-321321-321321"
                        }
                    }
                }, {
                    id: "ORD-121212-121212",
                    email: "demo3@ch.gov.uk",
                    companyNumber: "12121212",
                    productLine: "item#certificate",
                    orderDate: "2020-02-12T12:00:00.000",
                    paymentStatus: "not-paid-for",
                    links: {
                        self: {
                            link: "/orders/ORD-121212-121212"
                        }
                    }
                }, {
                    id: "ORD-323232-323232",
                    email: "demo4@ch.gov.uk",
                    companyNumber: "32323232",
                    productLine: "item#certified-copy",
                    orderDate: "2021-12-21T12:00:00.000",
                    paymentStatus: "paid"
                }, {
                    id: "ORD-230230-230230",
                    email: "demo5@ch.gov.uk",
                    companyNumber: "23023023"
                }] as CheckoutSummaryResource[]
            } as SearchResponse
        });
        const mapper = new SearchResultsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            totalOrders: 10,
            orderSummaries: [
                {
                    id: "ORD-123123-123123",
                    email: "demo@ch.gov.uk",
                    extraProperties: {
                        companyNumber: "12345678"
                    },
                    productLine: "Certificate",
                    orderDate: "01/01/2022",
                    paymentStatus: "Paid",
                    detailHref: "/orders-admin/orders/ORD-123123-123123",
                },
                {
                    id: "ORD-321321-321321",
                    email: "demo2@ch.gov.uk",
                    extraProperties: {
                        companyNumber: "87654321"
                    },
                    productLine: "Missing image",
                    orderDate: "05/05/2021",
                    paymentStatus: "Paid",
                    detailHref: ""
                },
                {
                    id: "ORD-121212-121212",
                    email: "demo3@ch.gov.uk",
                    extraProperties: {
                        companyNumber: "12121212"
                    },
                    productLine: "Certificate",
                    orderDate: "12/02/2020",
                    paymentStatus: "Unknown",
                    detailHref: ""
                },
                {
                    id: "ORD-323232-323232",
                    email: "demo4@ch.gov.uk",
                    extraProperties: {
                        companyNumber: "32323232"
                    },
                    productLine: "Certified copy",
                    orderDate: "21/12/2021",
                    paymentStatus: "Paid",
                    detailHref: ""
                },
                {
                    id: "ORD-230230-230230",
                    email: "demo5@ch.gov.uk",
                    extraProperties: {
                        companyNumber: "23023023"
                    },
                    productLine: "Unknown",
                    orderDate: "Unknown",
                    paymentStatus: "Unknown",
                    detailHref: ""
                }
            ] as OrderSummary[]
        } as SearchResults);
    });

    it("Maps a successful response with multi-item summaries enabled", () => {
        // given
        FEATURE_FLAGS.multiItemBasketEnabled = true;
        const serverResponse = new Success<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                totalOrders: 10,
                orderSummaries: [{
                    id: "ORD-123123-123123",
                    email: "demo@ch.gov.uk",
                    orderDate: "2022-01-01T12:00:00.000",
                    paymentStatus: "paid",
                    links: {
                        self: {
                            link: "/orders/ORD-123123-123123"
                        }
                    }
                }, {
                    id: "ORD-321321-321321",
                    email: "demo2@ch.gov.uk",
                    orderDate: "2021-05-05T12:00:00.000",
                    paymentStatus: "paid",
                    links: {
                        self: {
                            link: "/orders/ORD-321321-321321"
                        }
                    }
                }, {
                    id: "ORD-121212-121212",
                    email: "demo3@ch.gov.uk",
                    orderDate: "2020-02-12T12:00:00.000",
                    paymentStatus: "not-paid-for",
                    links: {
                        self: {
                            link: "/orders/ORD-121212-121212"
                        }
                    }
                }, {
                    id: "ORD-323232-323232",
                    email: "demo4@ch.gov.uk",
                    orderDate: "2021-12-21T12:00:00.000",
                    paymentStatus: "paid"
                }, {
                    id: "ORD-230230-230230",
                    email: "demo5@ch.gov.uk"
                }] as CheckoutSummaryResource[]
            } as SearchResponse
        });
        const mapper = new SearchResultsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            totalOrders: 10,
            orderSummaries: [
                {
                    id: "ORD-123123-123123",
                    email: "demo@ch.gov.uk",
                    extraProperties: {
                    },
                    orderDate: "01/01/2022",
                    paymentStatus: "Paid",
                    detailHref: "javascript:void(0)"
                },
                {
                    id: "ORD-321321-321321",
                    email: "demo2@ch.gov.uk",
                    extraProperties: {
                    },
                    orderDate: "05/05/2021",
                    paymentStatus: "Paid",
                    detailHref: "javascript:void(0)"
                },
                {
                    id: "ORD-121212-121212",
                    email: "demo3@ch.gov.uk",
                    extraProperties: {
                    },
                    orderDate: "12/02/2020",
                    paymentStatus: "Unknown",
                    detailHref: "javascript:void(0)"
                },
                {
                    id: "ORD-323232-323232",
                    email: "demo4@ch.gov.uk",
                    extraProperties: {
                    },
                    orderDate: "21/12/2021",
                    paymentStatus: "Paid",
                    detailHref: "javascript:void(0)"
                },
                {
                    id: "ORD-230230-230230",
                    email: "demo5@ch.gov.uk",
                    extraProperties: {
                    },
                    orderDate: "Unknown",
                    paymentStatus: "Unknown",
                    detailHref: "javascript:void(0)"
                }
            ] as OrderSummary[]
        } as SearchResults);
    });

    it("Maps an error response", () => {
        // given
        FEATURE_FLAGS.multiItemBasketEnabled = false;
        const serverResponse = new Failure<ApiResponse<SearchResponse>, ApiErrorResponse>({
            httpStatusCode: 401,
            errors: [{
                error: "Something went wrong",
            }, {
                error: "Something else went wrong"
            }]
        });
        const mapper = new SearchResultsMapper();

        // when
        const actual = mapper.map(serverResponse);

        // then
        expect(actual).toEqual({
            status: Status.SERVER_ERROR
        });
    });
});
