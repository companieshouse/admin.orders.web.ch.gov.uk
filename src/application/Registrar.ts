import { Application } from "./Application";
import { HelloController } from "../hello/HelloController";
import { Service } from "typedi";
import "reflect-metadata";
import { MiddlewareProvider } from "../security/MiddlewareProvider";
import {GoodbyeController} from "../hello/GoodbyeController";
import {NextFunction, Request, Response} from "express";

@Service()
export class Registrar {
    constructor(private readonly app: Application, private readonly middlewareProvider: MiddlewareProvider,
                private readonly helloController: HelloController,
                private readonly goodbyeController: GoodbyeController) {
    }

    public start(): void {
        this.app.bindGet("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            res.redirect("/hello");
        }, this.middlewareProvider.middlewareables);
        this.app.bindGet("/hello", this.helloController.render.bind(this.helloController), this.middlewareProvider.middlewareables);
        this.app.bindGet('/goodbye', this.goodbyeController.render.bind(this.goodbyeController), this.middlewareProvider.middlewareables);
        this.app.start();
    }

    public getPortNumber(): number {
        return this.app.getPort();
    }

    public stop(): void {
        this.app.stop();
    }
}
