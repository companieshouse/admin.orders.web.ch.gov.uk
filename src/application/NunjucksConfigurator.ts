import { Express } from "express";
import nunjucks from "nunjucks";
import { Service } from "typedi";
import path from "path";
import { ServerPaths } from "./ServerPaths";
import { ExpressConfigurator } from "./ExpressConfigurator";

@Service()
export class NunjucksConfigurator implements ExpressConfigurator {

    constructor(private config: ServerPaths) {
    }

    public configure(express: Express): void {
        express.engine("njk", nunjucks.render);
        express.set("view engine", "njk");

        // Assets to serve at web context path
        const templatePaths = [ path.join(this.config.applicationRootDir, "node_modules/govuk-frontend"),
            path.join(this.config.applicationRootDir, "node_modules/govuk-frontend/components"),
            path.join(this.config.applicationRootDir, "dist/views") ];

        // set up the template engine
        const nunjucksEnv = nunjucks.configure(templatePaths, {
            autoescape: true,
            express: express
        });
        nunjucksEnv.addGlobal("contextPath", this.config.webContextPath); // Root of stylesheets, scripts etc
        nunjucksEnv.addGlobal("assetPath", path.join(this.config.webContextPath, "assets")); // GDS assets path
    }
}