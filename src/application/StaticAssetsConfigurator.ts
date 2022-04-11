import { ExpressConfigurator } from "./ExpressConfigurator";
import express, { Express } from "express";
import { ServerPaths } from "./ServerPaths";
import { Service } from "typedi";

@Service()
export class StaticAssetsConfigurator implements ExpressConfigurator {
    constructor(private serverPaths: ServerPaths) {
    }

    configure(app: Express): void {
        // serve static assets at web context path
        app.use(this.serverPaths.webContextPath, express.static(this.serverPaths.publicAssetsDir));
    }
}