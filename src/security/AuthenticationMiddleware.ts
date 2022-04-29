import { NextFunction, Request, Response } from "express";
import { Middlewareable } from "../application/Middlewareable";
import { Service } from "typedi";
import "reflect-metadata";
import {SessionKey} from "@companieshouse/node-session-handler/lib/session/keys/SessionKey";
import {SignInInfoKeys} from "@companieshouse/node-session-handler/lib/session/keys/SignInInfoKeys";
import {createLogger} from "@companieshouse/structured-logging-node";
import {UserProfileKeys} from "@companieshouse/node-session-handler/lib/session/keys/UserProfileKeys";

@Service()
export class AuthenticationMiddleware implements Middlewareable {
    private static readonly logger = createLogger("AuthenticationMiddleware");

    public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        const isSignedIn = req.session?.data?.[SessionKey.SignInInfo]?.[SignInInfoKeys.SignedIn] === 1;
        if (!isSignedIn) {
            return res.redirect(`/signin?return_to=${req.path}`);
        } else {
            const userId = req.session?.data?.[SessionKey.SignInInfo]?.[SignInInfoKeys.UserProfile]?.[UserProfileKeys.UserId];
            AuthenticationMiddleware.logger.info(`Successfully authenticated user ${userId}`);
            next();
        }
    }
}
