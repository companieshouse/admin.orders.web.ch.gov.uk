import {Middlewareable} from "../application/Middlewareable";
import {NextFunction, Request, RequestHandler, Response} from "express";
import {CookieConfig, SessionMiddleware, SessionStore} from "@companieshouse/node-session-handler";
import {Inject, Service} from "typedi";
import "reflect-metadata";
import "@companieshouse/node-session-handler/lib/session/store/SessionStore";
import "../config/ApplicationCookieConfig";
import Redis from "ioredis";
import {SessionModel} from "../session/SessionModel";

@Service()
export class RedisSessionMiddleware implements Middlewareable {
    private readonly sessionMiddleware: RequestHandler;
    // adding a variable readonly so we can see it in application.ts

    public readonly sessionStore: SessionStore;

    constructor(@Inject('cookieConfig') cookieConfig: CookieConfig) {
    // separated creation of sessionStore value here

        this.sessionStore = new SessionStore(new Redis(`redis://${process.env.CACHE_SERVER}`));
        this.sessionMiddleware = SessionMiddleware(cookieConfig, this.sessionStore);
    }

    public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        await this.sessionMiddleware(req, res, () => {});
        req.orderAdminSession = new SessionModel(req.session);
        next();
    }
}
