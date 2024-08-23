import { Middlewareable } from "application/Middlewareable";
import { Service } from "typedi";
import "reflect-metadata";
import { AuthorisationMiddleware } from "./AuthorisationMiddleware";
import { AuthenticationMiddleware } from "./AuthenticationMiddleware";
import { RedisSessionMiddleware } from "./RedisSessionMiddleware";
import { CsrfProtectionsMiddleware } from "./CsrfProtectionsMiddleware";

@Service("production.middleware")
export class DefaultMiddlewareProvider implements MiddlewareProvider {
    public readonly middlewareables: Middlewareable[];

    constructor(private readonly sessionMiddleware: RedisSessionMiddleware,
                private readonly authenticationMiddleware: AuthenticationMiddleware,
                private readonly authorisationMiddleware: AuthorisationMiddleware,
                private readonly csrfProtectionMiddleware: CsrfProtectionsMiddleware) {
        this.middlewareables = [ sessionMiddleware, authenticationMiddleware, authorisationMiddleware, csrfProtectionMiddleware  ];
    }
}

@Service("noop.middleware")
export class NoopMiddlewareProvider implements MiddlewareProvider {
    public readonly middlewareables: Middlewareable[] = [];
}

export interface MiddlewareProvider {
    readonly middlewareables: Middlewareable[];
}
