import {DefaultApiClientFactory} from "../../src/client/ApiClientFactory";
import {ApiClientConfiguration} from "../../src/config/ApiClientConfiguration";

describe("DefaultApiClientFactory", () => {
    it("Constructs a new ApiClient instance using a valid base url and token", () => {
        // given
        const expectedBaseUrl = "http://0.0.0.0";
        const expectedToken = "F00DFACE";
        const factory = new DefaultApiClientFactory(new ApiClientConfiguration(expectedBaseUrl));

        // when
        const actual = factory.newApiClient(expectedToken);
        const apiClient: any = actual.apiClient;

        // then
        expect(apiClient.options.baseUrl).toEqual(expectedBaseUrl);
        expect(apiClient.headers["Authorization"]).toEqual(`Bearer ${expectedToken}`);
    });

    it("Throws an error if no base url specified", () => {
        // given
        const factory = new DefaultApiClientFactory(new ApiClientConfiguration(""));

        // when
        const execution = () => factory.newApiClient("");

        // then
        expect(execution).toThrowError();
    });

    it("Throws an error if no token specified", () => {
        // given
        const factory = new DefaultApiClientFactory(new ApiClientConfiguration("http://0.0.0.0"));

        // when
        const execution = () => factory.newApiClient("");

        // then
        expect(execution).toThrowError();
    });
});
