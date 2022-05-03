import ApiClient from "@companieshouse/api-sdk-node/dist/client";
import {createApiClient} from "@companieshouse/api-sdk-node";
import {ApiClientConfiguration} from "../config/ApiClientConfiguration";
import {Service} from "typedi";
import "../config/ApiClientConfiguration";
import "reflect-metadata";

@Service("default.client")
export class DefaultApiClientFactory {
    constructor(private configuration: ApiClientConfiguration) {
    }

    newApiClient(token: string): ApiClient {
        return createApiClient(undefined, token, this.configuration.apiUrl);
    }
}

export interface ApiClientFactory {
    newApiClient(token: string): ApiClient;
}
