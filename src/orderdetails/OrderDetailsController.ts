import {Service} from "typedi";
import {NextFunction, Request, Response} from "express";
import "reflect-metadata";
import {PageFactory} from "./PageFactory";
import {createLogger} from "@companieshouse/structured-logging-node";
import { OrderDetailsService } from "./OrderDetailsService";

@Service()
export class OrderDetailsController {
    private static readonly logger = createLogger("SearchController");

    constructor(public service: OrderDetailsService, public pageFactory: PageFactory) {
        this.service = service;
        this.pageFactory = pageFactory;
    }

    public async handleGet(req: Request, res: Response, next: NextFunction): Promise<void> {
        OrderDetailsController.logger.trace("GET request received");
        const model = this.pageFactory.buildOrderDetailsPage(req.body.orderId);
        res.render(model.template, {
            control: model
        });
        OrderDetailsController.logger.trace("Finished processing GET request");
    }
}
