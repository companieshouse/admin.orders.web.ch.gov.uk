import { Application } from "./Application"
import { HelloController } from "../hello/HelloController"
import { Service } from "typedi"
import "reflect-metadata"
import { MiddlewareProvider } from "../security/MiddlewareProvider"

@Service()
export class Registrar {
    constructor(private readonly app: Application, private readonly middlewareProvider: MiddlewareProvider, private readonly helloController: HelloController) {
    }

    public start(): void {
        this.app.bindGet("/hello", this.helloController.render.bind(this.helloController), this.middlewareProvider.middlewareables)
        this.app.start()
    }
}