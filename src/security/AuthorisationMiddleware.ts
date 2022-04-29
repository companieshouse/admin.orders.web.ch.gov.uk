import { NextFunction, Request, Response } from "express";
import { Middlewareable } from "../application/Middlewareable";
import { Service } from "typedi";
import "reflect-metadata";
import {createLogger} from "@companieshouse/structured-logging-node";
import {GlobalPageFactory} from "../core/GlobalPageFactory";

@Service()
export class AuthorisationMiddleware implements Middlewareable {
    private static readonly logger = createLogger("AuthenticationMiddleware");

    constructor(private pageFactory: GlobalPageFactory) {
    }

    public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!req.orderAdminSession?.permittedToInvestigateOrders()) {
            AuthorisationMiddleware.logger.info(`User ${req.orderAdminSession?.getUserId()} is not authorised to use the service`);
            const model = this.pageFactory.buildUnauthorised();
            res.render(model.template, {
                control: model
            });
        } else {
            AuthorisationMiddleware.logger.info(`Successfully authorised user ${req.orderAdminSession?.getUserId()}`);
            next();
        }
    }
}
