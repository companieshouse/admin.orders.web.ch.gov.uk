import {ServiceProvider} from "../../src/search/ServiceProvider";

describe("ServiceConfigurator", () => {
    const fakeService: any = {};
    const realService: any = {};
    it("Resolves fake service if fake service configured", () => {
        // given
        const configurator = new ServiceProvider(1000, "fake", fakeService, realService);

        // when
        const actual = configurator.service;

        // then
        expect(actual).toBe(fakeService)
    })

    it("Resolves real service if fake service not configured", () => {
        // given
        const configurator = new ServiceProvider(1000, "notFake", fakeService, realService);

        // when
        const actual = configurator.service;

        // then
        expect(actual).toBe(realService);
    })
});
