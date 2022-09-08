import { NextFunction, Request, Response } from "express";
import { OrderItemSummaryService } from "./OrderItemSummaryService";
import {createLogger} from "@companieshouse/structured-logging-node";
import {Service} from "typedi";
import "reflect-metadata";
import {PageFactory} from "../orderdetails/PageFactory";

@Service()
export class OrderItemSummaryController {
    private static readonly logger = createLogger("OrderItemSummaryController");

    constructor (public service: OrderItemSummaryService, public pageFactory: PageFactory) {
        this.service = service;
        this.pageFactory = pageFactory;
    }

    async viewSummary (request: Request, response: Response, next: NextFunction): Promise<void> {

    }
}
