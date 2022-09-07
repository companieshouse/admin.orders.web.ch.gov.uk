import {NextFunction, Request, Response} from "express";
import {OrderSummaryService} from "./OrderSummaryService";
import {createLogger} from "@companieshouse/structured-logging-node";
import {Inject, Service} from "typedi";
import {PageFactory} from "./PageFactory";
import {Status} from "../core/Status";
import "reflect-metadata";
import {BACK_LINK_TOGGLER} from "../config/BackLinkToggler";

@Service()
export class OrderSummaryController {

    private static logger = createLogger("OrderSummaryController");

    private service: OrderSummaryService;
    private pageFactory: PageFactory;

    constructor(@Inject() service: OrderSummaryService, @Inject() pageFactory: PageFactory) {
        this.service = service;
        this.pageFactory = pageFactory;
    }

    async readOrder(req: Request, res: Response, next: NextFunction) {
        const orderId = req.params.orderId;
        const accessToken = req.orderAdminSession?.getAccessToken() || "";
        const userId = req.orderAdminSession?.getUserId();

        OrderSummaryController.logger.debug(`Retrieving summary for order [${orderId}] for user [${userId}]...`);
        const orderSummary = await this.service.fetchOrderSummary(orderId, accessToken);

        let viewModel;
        if (orderSummary.status === Status.CLIENT_ERROR) {
            OrderSummaryController.logger.debug(`Client error returned for order [${orderId}] for user [${userId}]`);
            viewModel = this.pageFactory.buildNotFound();
        } else if (orderSummary.status === Status.SERVER_ERROR || !orderSummary.summary) {
            OrderSummaryController.logger.debug(`Server error returned for order [${orderId}] for user [${userId}]`);
            viewModel = this.pageFactory.buildServiceUnavailable();
        } else {
            viewModel = this.pageFactory.buildOrderSummaryPage(orderSummary.summary);
        }

        return res.render(viewModel.template, {
            control: viewModel,
            renderBackButton: BACK_LINK_TOGGLER.orderPageBackLinkEnabled
        });
    }
}
