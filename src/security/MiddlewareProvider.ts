import { Middlewareable } from "application/Middlewareable"
import { Service } from "typedi"
import "reflect-metadata"
import { FakeAuthenticationMiddleware } from "./FakeAuthenticationMiddleware"
import { AuthorisationMiddleware } from "./AuthorisationMiddleware"

@Service()
export class MiddlewareProvider {
    public readonly middlewareables: Middlewareable[]

    constructor(private readonly authenticationMiddleware: FakeAuthenticationMiddleware,
                private readonly authorisationMiddleware: AuthorisationMiddleware) {
        this.middlewareables = [ authenticationMiddleware, authorisationMiddleware ]
    }
}