import { Application } from "./Application";
import {Inject, Service} from "typedi";
import "reflect-metadata";
import {MiddlewareProvider} from "../security/MiddlewareProvider";
import { ServerPaths } from "./ServerPaths";
import {SearchController} from "../search/SearchController";
import "../security/MiddlewareProvider";
import { OrderDetailsController } from "../orderdetails/OrderDetailsController";

@Service()
export class Registrar {
    constructor(private readonly app: Application,
                @Inject((process.env.ADMIN_ORDERS_DEVELOPMENT_MODE === "true" ? "noop.middleware" : "production.middleware")) private readonly middlewareProvider: MiddlewareProvider,
                private readonly serverPaths: ServerPaths,
                private readonly searchController: SearchController,
                private readonly orderDetailsController: OrderDetailsController) {
    }

    public start(): void {
        this.app.bindGet("/signout", async (req, res, next): Promise<void> => { res.status(200).send(); }, []);
        this.app.bindGet(this.serverPaths.webContextPath + "/search", this.searchController.handleGet.bind(this.searchController), this.middlewareProvider.middlewareables);
        this.app.bindPost(this.serverPaths.webContextPath + "/search", this.searchController.handlePost.bind(this.searchController), this.middlewareProvider.middlewareables);
        this.app.bindGet(this.serverPaths.webContextPath + "/orders/:orderId", this.orderDetailsController.handleGet.bind(this.orderDetailsController), this.middlewareProvider.middlewareables)
        this.app.start();
    }

    public getPortNumber(): number {
        return this.app.getPort();
    }

    public stop(): void {
        this.app.stop();
    }
}
