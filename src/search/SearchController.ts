import {Service} from "typedi";
import {NextFunction, Request, Response} from "express";
import {SearchService} from "./SearchService";
import {ServiceProvider} from "./ServiceProvider";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchCriteria} from "./SearchCriteria";
import "reflect-metadata";
import {PageFactory} from "./PageFactory";
import {Status} from "../core/Status";
import {createLogger} from "@companieshouse/structured-logging-node";

@Service()
export class SearchController {
    private static readonly logger = createLogger("SearchController");

    private readonly service: SearchService;
    private readonly limit: number;
    private readonly pageFactory: PageFactory;

    constructor(serviceProvider: ServiceProvider, pageFactory: PageFactory) {
        this.service = serviceProvider.service;
        this.limit = serviceProvider.maximumResults;
        this.pageFactory = pageFactory;
    }

    public async handleGet(req: Request, res: Response, next: NextFunction): Promise<void> {
        SearchController.logger.trace("GET request received");
        const model = this.pageFactory.buildInitialSearchPage();
        res.render(model.template, {
            control: model
        });
        SearchController.logger.trace("Finished processing GET request");
    }

    public async handlePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        SearchController.logger.trace("POST request received");
        const searchCriteria = new SearchCriteria(
            req.body.orderNumber,
            req.body.email,
            req.body.companyNumber
        );
        const results = await this.service.findOrders(new OrderSearchParameters(searchCriteria));
        if (results.status !== Status.SUCCESS) {
            const model = this.pageFactory.buildServiceUnavailable();
            res.render(model.template, {
                control: model
            });
            return;
        }
        const model = this.pageFactory.buildSearchPageWithResults(searchCriteria, results.orderSummaries);
        res.render(model.template, {
            control: model
        });
        SearchController.logger.trace("Finished processing POST request");
    }
}
