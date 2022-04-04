import { CookieConfig, SessionMiddleware, SessionStore } from "@companieshouse/node-session-handler";
import { RequestHandler } from "express";
import { MiddlewareProvider } from "./MiddlewareProvider";

export class CompaniesHouseMiddlewareProvider implements MiddlewareProvider {
    constructor(private readonly config: CookieConfig, private readonly sessionStore: SessionStore) {
    }

    sessionMiddleware = (): RequestHandler => {
        return SessionMiddleware(this.config, this.sessionStore)
    }
}