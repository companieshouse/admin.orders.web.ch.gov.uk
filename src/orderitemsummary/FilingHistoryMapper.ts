import fs from "fs";
import yaml from "yaml";

const FILING_HISTORY_DESCRIPTIONS_PATH: string = "api-enumerations/filing_history_descriptions.yml";
const DESCRIPTIONS_CONSTANT: string = "description";
const filingHistoryDescriptions = yaml.parse(fs.readFileSync(FILING_HISTORY_DESCRIPTIONS_PATH, "utf8"));

export const mapFilingHistoryDate = (dateString: string): string => {
    const d = new Date(dateString);
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    return `${day} ${month} ${year}`;
};

export const mapFilingHistory = (description: string, descriptionValues: Record<string, string>): string => {
    const descriptionFromFile = getFullFilingHistoryDescription(description);
    const mappedFilingHistoryDescription = mapFilingHistoryDescriptionValues(descriptionFromFile, descriptionValues || {});
    return removeAsterisks(mappedFilingHistoryDescription);
};

const getFullFilingHistoryDescription = (descriptionKey: string): string => {
    if (filingHistoryDescriptions === undefined) {
        return descriptionKey;
    } else {
        return filingHistoryDescriptions[DESCRIPTIONS_CONSTANT][descriptionKey] || descriptionKey;
    }
};

const mapFilingHistoryDescriptionValues = (description: string, descriptionValues: Record<string, string>) => {
    if (descriptionValues.description) {
        return descriptionValues.description;
    } else {
        return Object.entries(descriptionValues).reduce((newObj, [key, val]) => {
            const value = key.includes("date") ? mapDateFullMonth(val) : val;
            return newObj.replace("{" + key + "}", value as string);
        }, description);
    }
};

const mapDateFullMonth = (dateString: string): string => {
    const d = new Date(dateString);
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    return `${day} ${month} ${year}`;
};

const removeAsterisks = (description: string) => {
    return description.replace(/\*/g, "");
};


