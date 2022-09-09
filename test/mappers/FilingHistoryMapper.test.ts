import {FilingHistoryMapper} from "../../src/mappers/FilingHistoryMapper";
import {ServerPaths} from "../../src/application/ServerPaths";

describe("FilingHistoryMapper", () => {
    describe("mapFilingHistoryDate", () => {
        it("maps short month date correctly", () => {
            // given
            const filingHistoryMapper = new FilingHistoryMapper({
                applicationRootDir: "."
            } as ServerPaths);

            // when
            const result = filingHistoryMapper.mapFilingHistoryDate("2009-12-23", false);

            // then
            expect(result).toBe("23 Dec 2009");
        });
    });

    describe("mapFilingHistory", () => {
        it("should lookup description in api-enumeration, replace the values in the description with the values in the descriptionValues and remove asterisks", () => {
            // given
            const description = "appoint-person-director-company-with-name-date";
            const descriptionValues = {
                appointment_date: "2010-02-12",
                officer_name: "Thomas David Wheare"
            };
            const filingHistoryMapper = new FilingHistoryMapper({
                applicationRootDir: "."
            } as ServerPaths);

            // when
            const result = filingHistoryMapper.mapFilingHistory(description, descriptionValues);

            // then
            expect(result).toBe("Appointment of Thomas David Wheare as a director on 12 February 2010");
        });
    });

    describe("mapFilingHistoryDescriptionValues", () => {
        it("should return the description in the descriptionValues if it is present", () => {
            // given
            const description = "legacy";
            const descriptionValues = {
                description: "this is the description"
            };
            const filingHistoryMapper = new FilingHistoryMapper({
                applicationRootDir: "."
            } as ServerPaths);

            // when
            const result = filingHistoryMapper.mapFilingHistoryDescriptionValues(description, descriptionValues);

            // then
            expect(result).toBe(descriptionValues.description);
        });

        it("should replace the values in the description with the values in the descriptionValues", () => {
            // given
            const description = "Appointment of {officer_name} as a director on {change_date}";
            const descriptionValues = {
                change_date: "2010-02-12",
                officer_name: "Thomas David Wheare"
            };
            const filingHistoryMapper = new FilingHistoryMapper({
                applicationRootDir: "."
            } as ServerPaths);

            // when
            const result = filingHistoryMapper.mapFilingHistoryDescriptionValues(description, descriptionValues);

            // then
            expect(result).toBe("Appointment of Thomas David Wheare as a director on 12 February 2010");
        });
    });

    describe("mapDateFullMonth", () => {
        it("maps full month date correctly", () => {
            // given
            const filingHistoryMapper = new FilingHistoryMapper({
                applicationRootDir: "."
            } as ServerPaths);

            // when
            const result = filingHistoryMapper.mapFilingHistoryDate("2009-12-23", true);

            // then
            expect(result).toBe("23 December 2009");
        });
    });

    describe("removeAsterisks", () => {
        it("should remove asterisks in text", () => {
            // given
            const text = "**Appointment** of ";
            const filingHistoryMapper = new FilingHistoryMapper({
                applicationRootDir: "."
            } as ServerPaths);

            // when
            const result = filingHistoryMapper.removeAsterisks(text);

            // then
            expect(result).toBe("Appointment of ");
        });
    });
});
