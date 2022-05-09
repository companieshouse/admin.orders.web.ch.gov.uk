import { Service } from "typedi";
import { DefaultOrderDetailsMapper } from "./DefaultOrderDetailsMapper";
import { LLPOrderDetailsMapper } from "./LLPOrderDetailsMapper";
import { LPOrderDetailsMapper } from "./LPOrderDetailsMapper";
import { OrderDetailsMapper } from "./OrderDetailsMapper";

@Service()
export class OrderDetailsMapperFactory {
    constructor(private readonly mappers: Map<string, OrderDetailsMapper>) {
        this.mappers = new Map<string, OrderDetailsMapper>();
        this.mappers.set("llp", new LLPOrderDetailsMapper());
        this.mappers.set("limited-partnership", new LPOrderDetailsMapper());
    }

    getOrDefault(companyType: string): OrderDetailsMapper {
        return this.mappers.get(companyType) || new DefaultOrderDetailsMapper();
    }
}