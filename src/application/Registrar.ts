import { Application } from "./Application";
import { FakeAuthenticationMiddleware } from "../security/FakeAuthenticationMiddleware";
import { AuthorisationMiddleware } from "../security/AuthorisationMiddleware";
import { HelloController } from "../hello/HelloController";
import { Middlewareable } from "./Middlewareable";

export class Registrar {
    private readonly app: Application
    private readonly middlewareables: Middlewareable[]

    constructor(private readonly helloController: HelloController) {
        // Get port from environment
        this.middlewareables = [ new FakeAuthenticationMiddleware(), new AuthorisationMiddleware() ]

        const port = parseInt(process.env.PORT || '3000', 10)

        if (isNaN(port)) {
            throw Error('Port number not provided by environment')
        }

        this.app = new Application(port)
    }

    public start(): void {
        this.app.bindGet('/orders-admin/hello', this.helloController.render.bind(this.helloController), this.middlewareables)

        this.app.start()
    }
}