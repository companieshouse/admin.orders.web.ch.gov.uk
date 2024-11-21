import { Middlewareable } from "application/Middlewareable";
import { Request, Response, NextFunction } from "express";
import { CsrfProtectionMiddleware } from "@companieshouse/web-security-node";
import { SessionStore } from "@companieshouse/node-session-handler";

export class CsrfMiddleware implements Middlewareable {
    private readonly csrfMiddleware: ReturnType<typeof CsrfProtectionMiddleware>;

    constructor(
        private readonly sessionStore: SessionStore,
        private readonly cookieName: string,
        private readonly enabled: boolean
    ) {
        this.csrfMiddleware = CsrfProtectionMiddleware({
            sessionStore: this.sessionStore,
            sessionCookieName: this.cookieName,
            enabled: this.enabled
        });
    }

    public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.csrfMiddleware(req, res, next);
        } catch (error) {
            console.error("CSRF Middleware Error:", error);
            next(error);
        }
    }
}