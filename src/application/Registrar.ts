import { Application } from "./Application";
import { HelloController } from "../hello/HelloController";
import { Service } from "typedi";
import "reflect-metadata";
import { MiddlewareProvider } from "../security/MiddlewareProvider";
import {GoodbyeController} from "../hello/GoodbyeController";
import {NextFunction, Request, Response} from "express";
import { ServerPaths } from "./ServerPaths";
import {SearchController} from "../search/SearchController";

@Service()
export class Registrar {
    constructor(private readonly app: Application, private readonly middlewareProvider: MiddlewareProvider,
                private readonly serverPaths: ServerPaths,
                private readonly helloController: HelloController,
                private readonly goodbyeController: GoodbyeController,
                private readonly searchController: SearchController) {
    }

    public start(): void {
        this.app.bindGet("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            res.redirect(this.serverPaths.webContextPath + "/hello");
        }, this.middlewareProvider.middlewareables);
        this.app.bindGet(this.serverPaths.webContextPath + "/hello", this.helloController.render.bind(this.helloController), this.middlewareProvider.middlewareables);
        this.app.bindGet(this.serverPaths.webContextPath + "/goodbye", this.goodbyeController.render.bind(this.goodbyeController), this.middlewareProvider.middlewareables);
        this.app.bindGet(this.serverPaths.webContextPath + "/search", this.searchController.handleGet.bind(this.searchController), this.middlewareProvider.middlewareables);
        this.app.bindPost(this.serverPaths.webContextPath + "/search", this.searchController.handlePost.bind(this.searchController), this.middlewareProvider.middlewareables);
        this.app.start();
    }

    public getPortNumber(): number {
        return this.app.getPort();
    }

    public stop(): void {
        this.app.stop();
    }
}
