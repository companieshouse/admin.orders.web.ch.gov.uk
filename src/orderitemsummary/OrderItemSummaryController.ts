import { NextFunction, Request, Response } from "express";
import { OrderItemSummaryService } from "./OrderItemSummaryService";
import {createLogger} from "@companieshouse/structured-logging-node";


export class OrderItemSummaryController {
    private static readonly logger = createLogger("OrderItemSummaryController");

    constructor (private service: OrderItemSummaryService = new OrderItemSummaryService()) {
    }

    async viewSummary (request: Request, response: Response, next: NextFunction): Promise<void> {

    }
}
