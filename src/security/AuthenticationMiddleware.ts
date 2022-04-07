import { CookieConfig, SessionMiddleware, SessionStore } from "@companieshouse/node-session-handler"
import { NextFunction, Request, RequestHandler, Response } from "express"
import { Middlewareable } from "../application/Middlewareable"
import { Service } from "typedi"
import "reflect-metadata"

@Service()
export class AuthenticationMiddleware implements Middlewareable {

    private readonly sessionMiddleware: RequestHandler

    constructor(private readonly config: CookieConfig, private readonly sessionStore: SessionStore) {
        this.sessionMiddleware = SessionMiddleware(this.config, this.sessionStore)
    }

    public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        return this.sessionMiddleware(req, res, next)
    }
}