import {Service} from "typedi";
import {NextFunction, Request, Response} from "express";
import {SearchService} from "./SearchService";
import {ServiceProvider} from "./ServiceProvider";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchCriteria} from "./SearchCriteria";
import "reflect-metadata";
import {PageFactory} from "./PageFactory";
import {Status} from "../core/Status";

@Service()
export class SearchController {
    private readonly service: SearchService;
    private readonly limit: number;
    private readonly pageFactory: PageFactory;

    constructor(serviceProvider: ServiceProvider, pageFactory: PageFactory) {
        this.service = serviceProvider.service;
        this.limit = serviceProvider.maximumResults;
        this.pageFactory = pageFactory;
    }

    public async handleGet(req: Request, res: Response, next: NextFunction): Promise<void> {
        const model = this.pageFactory.buildInitialSearchPage();
        res.render(model.template, {
            control: model
        });
    }

    public async handlePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const searchCriteria = new SearchCriteria(
            req.body.orderNumber,
            req.body.email,
            req.body.companyNumber
        );
        const results = await this.service.findOrders(new OrderSearchParameters(searchCriteria));
        if (results.status !== Status.SUCCESS) {
            const model = this.pageFactory.buildServiceUnavailable();
            res.status(500);
            res.render(model.template, {
                control: model
            });
            return;
        }
        const model = this.pageFactory.buildSearchPageWithResults(searchCriteria, results.orderSummaries);
        res.render(model.template, {
            control: model
        });
    }
}
