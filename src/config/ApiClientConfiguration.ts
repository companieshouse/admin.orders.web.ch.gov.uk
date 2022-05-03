import {Service} from "typedi";
import "reflect-metadata";

@Service()
export class ApiClientConfiguration {
    constructor(public apiUrl: string = process.env.API_URL || "") {
    }
}
