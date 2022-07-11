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
import {BACK_LINK_TOGGLER} from "../config/BackLinkToggler";

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
            control: model,
            renderBackButton: BACK_LINK_TOGGLER.searchPageBackLinkEnabled
        });
        SearchController.logger.trace("Finished processing GET request");
    }

    public async handlePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        SearchController.logger.trace("POST request received");
        const searchCriteria = new SearchCriteria(
            this.limit,
            req.body.orderNumber,
            req.body.email,
            req.body.companyNumber
        );
        const searchParameters = new OrderSearchParameters(searchCriteria, req.orderAdminSession?.getAccessToken() || "");
        const results = await this.service.findOrders(searchParameters);
        if (results.status !== Status.SUCCESS) {
            const model = this.pageFactory.buildServiceUnavailable();
            res.render(model.template, {
                control: model
            });
            return;
        }
        const model = this.pageFactory.buildSearchPageWithResults(searchCriteria, results);
        res.render(model.template, {
            control: model,
            renderBackButton: BACK_LINK_TOGGLER.searchPageBackLinkEnabled
        });
        SearchController.logger.trace("Finished processing POST request");
    }
}
