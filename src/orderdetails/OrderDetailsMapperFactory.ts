import { Service } from "typedi";
import { DefaultOrderDetailsMapper } from "./DefaultOrderDetailsMapper";
import { NullOrderDetailsMapper } from "./NullOrderDetailsMapper";
import { LLPOrderDetailsMapper } from "./LLPOrderDetailsMapper";
import { LPOrderDetailsMapper } from "./LPOrderDetailsMapper";
import { OrderDetailsMapper } from "./OrderDetailsMapper";
import { ApiResult, ApiResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { Checkout, CertificateItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import "reflect-metadata";
import { Inject } from "typedi";

@Service()
export class OrderDetailsMapperFactory {
    private readonly mappers: Map<string, OrderDetailsMapper>
    constructor(@Inject() llpMapper: LLPOrderDetailsMapper, @Inject() lpMapper: LPOrderDetailsMapper,
        @Inject() private readonly defaultMapper: DefaultOrderDetailsMapper, 
        @Inject() private readonly nullMapper: NullOrderDetailsMapper) {
        this.mappers = new Map<string, OrderDetailsMapper>();
        this.mappers.set("llp", llpMapper);
        this.mappers.set("limited-partnership", lpMapper);
    }

    getOrDefault(response: ApiResult<ApiResponse<Checkout>>): OrderDetailsMapper {
        if (response.isSuccess()) {
            const companyType: string = (response.value.resource?.items[0].itemOptions as CertificateItemOptions).companyType;
            return this.mappers.get(companyType) || this.defaultMapper;
        } else {
            return this.nullMapper;
        }
    }
}