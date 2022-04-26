import ApiClient from "@companieshouse/api-sdk-node/dist/client";
import {createApiClient} from "@companieshouse/api-sdk-node";
import {Service} from "typedi";
import "reflect-metadata";

@Service("default.client")
export class DefaultApiClientFactory {
    constructor(private apiUrl: string = process.env.API_URL || "", private apiKey: string = process.env.CHS_API_KEY || "") {
    }

    newApiClient(): ApiClient {
        return createApiClient(this.apiKey, undefined, this.apiUrl);
    }
}

export interface ApiClientFactory {
    newApiClient(): ApiClient;
}
