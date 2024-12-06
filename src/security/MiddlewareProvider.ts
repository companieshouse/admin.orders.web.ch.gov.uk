import { Middlewareable } from "application/Middlewareable";
import { Service } from "typedi";
import "reflect-metadata";
import { AuthorisationMiddleware } from "./AuthorisationMiddleware";
import { AuthenticationMiddleware } from "./AuthenticationMiddleware";
import { RedisSessionMiddleware } from "./RedisSessionMiddleware";
import { CsrfMiddleware } from "./CsrfMiddleware";
import { COOKIE_NAME } from "../config/EnvironmentProperties";

@Service("production.middleware")
export class DefaultMiddlewareProvider implements MiddlewareProvider {
    public readonly middlewareables: Middlewareable[];

    constructor(private readonly sessionMiddleware: RedisSessionMiddleware,
                private readonly authenticationMiddleware: AuthenticationMiddleware,
                private readonly authorisationMiddleware: AuthorisationMiddleware) {

                const csrfMiddleware = new CsrfMiddleware(this.sessionMiddleware.getSessionStore, COOKIE_NAME, true)
        this.middlewareables = [ sessionMiddleware, authenticationMiddleware, authorisationMiddleware, csrfMiddleware ];
    }
}

@Service("noop.middleware")
export class NoopMiddlewareProvider implements MiddlewareProvider {
    public readonly middlewareables: Middlewareable[] = [];
}

export interface MiddlewareProvider {
    readonly middlewareables: Middlewareable[];
}
