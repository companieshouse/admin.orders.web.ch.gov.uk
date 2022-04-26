import {DefaultApiClientFactory} from "../../src/client/ApiClientFactory";

describe("DefaultApiClientFactory", () => {
    it("Constructs a new ApiClient instance using apiUrl and apiKey field values", () => {
        // given
        const expectedBaseUrl = "http://0.0.0.0";
        const expectedApiKey = "F00DFACE";
        const factory = new DefaultApiClientFactory(expectedBaseUrl, expectedApiKey);

        // when
        const actual = factory.newApiClient();
        const apiClient: any = actual.apiClient;

        // then
        expect(apiClient.options.baseUrl).toEqual(expectedBaseUrl);
        expect(apiClient.options.apiKey).toEqual(expectedApiKey);
    });

    it("Constructs a new ApiClient instance using environment variables as default values", () => {
        // given
        process.env.API_URL = "http://localhost";
        process.env.CHS_API_KEY = "API_KEY";
        const factory = new DefaultApiClientFactory();

        // when
        const actual = factory.newApiClient();
        const apiClient: any = actual.apiClient;

        // then
        expect(apiClient.options.baseUrl).toEqual("http://localhost");
        expect(apiClient.options.apiKey).toEqual("API_KEY");
    });

    it("Throws an error if apiUrl or apiKey are falsy", () => {
        // given
        process.env.API_URL = "";
        process.env.CHS_API_KEY = "";
        const factory = new DefaultApiClientFactory();

        // when
        const execution = () => factory.newApiClient();

        // then
        expect(execution).toThrowError();
    });
});
