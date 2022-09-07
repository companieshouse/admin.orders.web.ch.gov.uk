import { mapFilingHistoryDate, mapFilingHistory, mapFilingHistoryDescriptionValues,
    mapDateFullMonth, removeAsterisks } from "../../src/mappers/FilingHistoryMapper";

describe("FilingHistoryMapper", () => {
    describe("mapFilingHistoryDate", () => {
        it("maps short month date correctly", () => {
            const result = mapFilingHistoryDate("2009-12-23");
            expect(result).toBe("23 Dec 2009");
        });
    });

    describe("mapFilingHistory", () => {
        it("should lookup description in api-enumeration, replace the values in the description with the values in the descriptionValues and remove asterisks", () => {
            const description = "appoint-person-director-company-with-name-date";
            const descriptionValues = {
                appointment_date: "2010-02-12",
                officer_name: "Thomas David Wheare"
            };
            const result = mapFilingHistory(description, descriptionValues);
            expect(result).toBe("Appointment of Thomas David Wheare as a director on 12 February 2010");
        });
    });

    describe("mapFilingHistoryDescriptionValues", () => {
        it("should return the description in the descriptionValues if it is present", () => {
            const description = "legacy";
            const descriptionValues = {
                description: "this is the description"
            };
            const result = mapFilingHistoryDescriptionValues(description, descriptionValues);
            expect(result).toBe(descriptionValues.description);
        });

        it("should replace the values in the description with the values in the descriptionValues", () => {
            const description = "Appointment of {officer_name} as a director on {change_date}";
            const descriptionValues = {
                change_date: "2010-02-12",
                officer_name: "Thomas David Wheare"
            };
            const result = mapFilingHistoryDescriptionValues(description, descriptionValues);
            expect(result).toBe("Appointment of Thomas David Wheare as a director on 12 February 2010");
        });
    });

    describe("mapDateFullMonth", () => {
        it("maps full month date correctly", () => {
            const result = mapDateFullMonth("2009-12-23");
            expect(result).toBe("23 December 2009");
        });
    });

    describe("removeAsterisks", () => {
        it("should remove asterisks in text", () => {
            const text = "**Appointment** of ";
            const result = removeAsterisks(text);
            expect(result).toBe("Appointment of ");
        });
    });
});
