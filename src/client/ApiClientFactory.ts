import ApiClient from "@companieshouse/api-sdk-node/dist/client";
import {createApiClient} from "@companieshouse/api-sdk-node";
import {Service} from "typedi";
import "reflect-metadata";

@Service()
export class ApiClientFactory {
    newApiClient(apiUrl: string = process.env.API_URL || "", apiKey: string = process.env.CHS_API_KEY || ""): ApiClient {
        return createApiClient(apiKey, undefined, apiUrl);
    }
}
