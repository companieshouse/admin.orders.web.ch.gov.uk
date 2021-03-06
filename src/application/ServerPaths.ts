import { Service } from "typedi";
import "reflect-metadata";
import path from "path";

@Service()
export class ServerPaths {
    public readonly applicationRootDir: string;
    public readonly publicAssetsDir: string;
    public readonly webContextPath: string;

    constructor() {
        // Application root directory
        this.applicationRootDir = path.join(__dirname, "../..");
        console.log("Application root directory: " + this.applicationRootDir);

        this.publicAssetsDir = path.join(this.applicationRootDir, "dist/public");

        // Web context paths
        this.webContextPath = "/orders-admin";
    }
}
