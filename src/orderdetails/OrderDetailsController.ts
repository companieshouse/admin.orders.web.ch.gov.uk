import {Service} from "typedi";
import {NextFunction, Request, Response} from "express";
import "reflect-metadata";
import {PageFactory} from "./PageFactory";
import {createLogger} from "@companieshouse/structured-logging-node";
import { OrderDetailsService } from "./OrderDetailsService";
import { OrderDetailsParameters } from "./OrderDetailsParameters";
import { Status } from "core/Status";

@Service()
export class OrderDetailsController {
    private static readonly logger = createLogger("OrderDetailsController");

    constructor(public service: OrderDetailsService, public pageFactory: PageFactory) {
        this.service = service;
        this.pageFactory = pageFactory;
    }

    public async handleGet(req: Request, res: Response, next: NextFunction): Promise<void> {
        OrderDetailsController.logger.trace("GET request received");
        const orderParameters = new OrderDetailsParameters(req.params.orderId, req.orderAdminSession?.getAccessToken() || "");
        const order = await this.service.fetchOrder(orderParameters);
        if (order.status !== Status.SUCCESS) {
            const model = this.pageFactory.buildServiceUnavailable();
            res.render(model.template, {
                control: model
            });
            return;
        }
        const model = this.pageFactory.buildOrderDetailsPage(order);
        res.render(model.template, {
            control: model
        });
        OrderDetailsController.logger.trace("Finished processing GET request");
    }
}
