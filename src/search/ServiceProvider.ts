import * as process from "process";
import {Inject, Service} from "typedi";
import "reflect-metadata";
import {FakeSearchService} from "./FakeSearchService";
import {OrderSearchService} from "./OrderSearchService";
import {SearchService} from "./SearchService";

@Service()
export class ServiceProvider {
    public service: SearchService;

    constructor(public maximumResults: number = parseInt(process.env.MAX_RESULTS || "1000") || 1000,
                serviceType: string = process.env.SERVICE_IMPLEMENTATION || "",
                @Inject() private fakeService: FakeSearchService,
                @Inject() private realService: OrderSearchService) {
        if (serviceType === "fake") {
            this.service = fakeService;
        } else {
            this.service = realService;
        }
    }
}
