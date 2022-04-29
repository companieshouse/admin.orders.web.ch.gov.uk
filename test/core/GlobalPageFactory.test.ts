import {ViewModel} from "../../src/core/ViewModel";
import {GlobalPageFactory} from "../../src/core/GlobalPageFactory";

describe("GlobalPageFactory", () => {
    it("Builds a service unavailable page", () => {
        // given
        const pageFactory = new GlobalPageFactory();

        // when
        const actual = pageFactory.buildServiceUnavailable();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("service_unavailable.njk", [])
        ], {
            title: "Service unavailable"
        }));
    });

    it("Builds an unauthorised page", () => {
        // given
        const pageFactory = new GlobalPageFactory();

        // when
        const actual = pageFactory.buildUnauthorised();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("unauthorised.njk", [])
        ], {
            title: "Unauthorised"
        }));
    });
});
