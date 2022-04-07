import { Service } from "typedi"
import "reflect-metadata"

@Service()
export class Config {
    public port() {
        const port = parseInt(process.env.PORT || "3000", 10)

        if (isNaN(port)) {
            throw Error("Port number not provided by environment")
        }

        return port
    }
}