import { NextFunction, Request, Response } from "express";
import { Middlewareable } from "../application/Middlewareable";
import { Service } from "typedi";
import "reflect-metadata";
import {createLogger} from "@companieshouse/structured-logging-node";

@Service()
export class AuthenticationMiddleware implements Middlewareable {
    private static readonly logger = createLogger("AuthenticationMiddleware");

    public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!req.orderAdminSession?.isUserSignedIn()) {
            res.redirect(`/signin?return_to=${req.path}`);
        } else {
            AuthenticationMiddleware.logger.info(`Successfully authenticated user ${req.orderAdminSession?.getUserId()}`);
            next();
        }
    }
}
