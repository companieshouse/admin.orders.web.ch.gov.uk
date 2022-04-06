import { App } from "./App";
import { FakeAuthenticationMiddleware } from "../security/FakeAuthenticationMiddleware";
import { AuthorisationMiddleware } from "../security/AuthorisationMiddleware";
import { HelloController } from "../hello/HelloController";
import { Middlewareable } from "./Middlewareable";

export class Registrar {
    private readonly app: App
    private readonly middlewareables: Middlewareable[]

    constructor(private readonly helloController: HelloController) {
        // Get port from environment
        this.middlewareables = [ new FakeAuthenticationMiddleware(), new AuthorisationMiddleware() ]

        const port = parseInt(process.env.PORT || '3000', 10)

        if (isNaN(port)) {
            throw Error('Port number not provided by environment')
        }

        this.app = new App(port)
    }

    public start(): void {
        this.app.bindGet('/', this.helloController.render.bind(this.helloController), this.middlewareables)

        this.app.start()
    }
}