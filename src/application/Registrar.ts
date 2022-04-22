import { Application } from "./Application";
import { Service } from "typedi";
import "reflect-metadata";
import { MiddlewareProvider } from "../security/MiddlewareProvider";
import { ServerPaths } from "./ServerPaths";
import {SearchController} from "../search/SearchController";

@Service()
export class Registrar {
    constructor(private readonly app: Application, private readonly middlewareProvider: MiddlewareProvider,
                private readonly serverPaths: ServerPaths,
                private readonly searchController: SearchController) {
    }

    public start(): void {
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
