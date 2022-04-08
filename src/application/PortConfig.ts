import { Service } from "typedi";

@Service()
export class PortConfig {
    public readonly port: number;

    constructor() {
        this.port = parseInt((process.env.PORT === "0" ? "0" : process.env.PORT || "3000"), 10);


        if (isNaN(this.port)) {
            throw Error("Port number not provided by environment");
        }
    }
}