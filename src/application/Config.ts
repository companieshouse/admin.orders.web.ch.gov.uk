import { Service } from "typedi";
import "reflect-metadata";
import path from "path";

@Service()
export class Config {
    public readonly staticResourcePath: string;
    public readonly webContextPath: string;
    public readonly gdsAssetPath: string;
    public readonly templatePaths: string[];
    public readonly applicationRoot: string;

    constructor() {
        // Application root directory
        if (process.env.NODE_ENV === "production") {
            console.log("***Production mode***");
            this.applicationRoot = "/app";
            this.staticResourcePath = path.join("../dist/public");
        } else {
            console.log("***Development mode***");
            this.applicationRoot = path.join(__dirname, "../../");
            this.staticResourcePath = path.join(this.applicationRoot, "dist/public");
        }
        console.log("ApplicationRoot: " + this.applicationRoot);

        // Base web context for this application
        this.webContextPath = "/orders-admin";
        this.gdsAssetPath = path.join(this.webContextPath, "assets");
        this.templatePaths = [ path.join(this.applicationRoot, "node_modules/govuk-frontend"), path.join(this.applicationRoot, "dist/views") ];
    }

    public port() {
        const port = parseInt(process.env.PORT || "3000", 10);

        if (isNaN(port)) {
            throw Error("Port number not provided by environment");
        }

        return port;
    }
}