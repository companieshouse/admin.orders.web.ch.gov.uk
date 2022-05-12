import {OrderDetailsMapperFactory} from "../../dist/orderdetails/OrderDetailsMapperFactory";
import {ApiErrorResponse, ApiResponse, ApiResult} from "@companieshouse/api-sdk-node/dist/services/resource";
import {Checkout} from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import {Failure, Success} from "@companieshouse/api-sdk-node/dist/services/result";

describe("OrderDetailsMapperFactory", () => {
    it("Returns an LLP mapper if company type is llp", () => {
        // given
        const llpMapper: any = {};
        const lpMapper: any = {};
        const defaultMapper: any = {};
        const errorMapper: any = {};
        const factory = new OrderDetailsMapperFactory(llpMapper, lpMapper, defaultMapper, errorMapper);
        const response: ApiResult<ApiResponse<Checkout>> = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                items: [{
                    itemOptions: {
                        companyType: "llp"
                    }
                }] as any[]
            } as Checkout
        });

        // when
        const actual = factory.getOrDefault(response);

        // then
        expect(actual).toBe(llpMapper);
    });

    it("Returns an LP mapper if company type is limited-partnership", () => {
        // given
        const llpMapper: any = {};
        const lpMapper: any = {};
        const defaultMapper: any = {};
        const errorMapper: any = {};
        const factory = new OrderDetailsMapperFactory(llpMapper, lpMapper, defaultMapper, errorMapper);
        const response: ApiResult<ApiResponse<Checkout>> = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                items: [{
                    itemOptions: {
                        companyType: "limited-partnership"
                    }
                }] as any[]
            } as Checkout
        });

        // when
        const actual = factory.getOrDefault(response);

        // then
        expect(actual).toBe(lpMapper);
    });

    it("Returns a default mapper if company type unhandled", () => {
        // given
        const llpMapper: any = {};
        const lpMapper: any = {};
        const defaultMapper: any = {};
        const errorMapper: any = {};
        const factory = new OrderDetailsMapperFactory(llpMapper, lpMapper, defaultMapper, errorMapper);
        const response: ApiResult<ApiResponse<Checkout>> = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                items: [{
                    itemOptions: {
                        companyType: "ltd"
                    }
                }] as any[]
            } as Checkout
        });

        // when
        const actual = factory.getOrDefault(response);

        // then
        expect(actual).toBe(defaultMapper);
    });

    it("Returns an error mapper if an error response is returned", () => {
        // given
        const llpMapper: any = {};
        const lpMapper: any = {};
        const defaultMapper: any = {};
        const errorMapper: any = {};
        const factory = new OrderDetailsMapperFactory(llpMapper, lpMapper, defaultMapper, errorMapper);
        const response: ApiResult<ApiResponse<Checkout>> = new Failure<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 500
        });

        // when
        const actual = factory.getOrDefault(response);

        // then
        expect(actual).toBe(errorMapper);
    });
});
