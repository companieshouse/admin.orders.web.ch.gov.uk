import { NextFunction, Request, Response } from "express";
import { OrderItemSummaryService } from "./OrderItemSummaryService";
import {createLogger} from "@companieshouse/structured-logging-node";
import {Service} from "typedi";
import "reflect-metadata";
import {Status} from "../core/Status";
import {GlobalPageFactory} from "../core/GlobalPageFactory";

@Service()
export class OrderItemSummaryController {
    private static readonly logger = createLogger("OrderItemSummaryController");

    constructor (public service: OrderItemSummaryService, public pageFactory: GlobalPageFactory) {
        this.service = service;
        this.pageFactory = pageFactory;
    }

    async viewSummary (request: Request, response: Response, next: NextFunction): Promise<void> {
        const orderId = request.params.orderId;
        const itemId = request.params.itemId;
        const apiToken = request.orderAdminSession?.getAccessToken() || "";
        const userId = request.orderAdminSession?.getUserId();
        OrderItemSummaryController.logger.debug(`Retrieving summary for order/item [${orderId}/${itemId}] for user [${userId}]...`);
        const result = await this.service.getOrderItem({
            orderId,
            itemId,
            apiToken
        });
        if (result.status === Status.CLIENT_ERROR) {
            const pageModel = this.pageFactory.buildNotFound();
            return response.render(pageModel.template, {
                control: pageModel,
                renderBackButton: true
            });
        } else if (result.status === Status.SERVER_ERROR) {
            const pageModel = this.pageFactory.buildServiceUnavailable();
            return response.render(pageModel.template, {
                control: pageModel,
                renderBackButton: true
            });
        } else {
            OrderItemSummaryController.logger.debug(`Retrieved summary for order/item [${orderId}/${itemId}] for user [${userId}]`);
            return response.render(result.viewModel!.template, {
                control: result.viewModel,
                renderBackButton: true
            });
        }
    }
}
