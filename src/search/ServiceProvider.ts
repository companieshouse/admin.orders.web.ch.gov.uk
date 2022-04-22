import * as process from "process";
import {Inject, Service} from "typedi";
import "reflect-metadata";
import {OrderSearchService} from "./OrderSearchService";

@Service()
export class ServiceProvider {
    constructor(public maximumResults: number = parseInt(process.env.MAX_RESULTS || "1000") || 1000,
                @Inject() public service: OrderSearchService) {
    }
}
