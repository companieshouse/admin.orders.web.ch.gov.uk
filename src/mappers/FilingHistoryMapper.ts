import fs from "fs";
import yaml from "js-yaml";
import dayjs from "dayjs";

const FILING_HISTORY_DESCRIPTIONS_PATH: string = "api-enumerations/filing_history_descriptions.yml";
const DESCRIPTIONS_CONSTANT: string = "description";

const filingHistoryDescriptions: any = yaml.safeLoad(fs.readFileSync(FILING_HISTORY_DESCRIPTIONS_PATH, "utf8"));


export const mapFilingHistory = (description: string, descriptionValues: Record<string, string>): string => {
    const descriptionFromFile = getFullFilingHistoryDescription(description);
    const mappedFilingHistoryDescription = mapFilingHistoryDescriptionValues(descriptionFromFile, descriptionValues || {});
    return removeAsterisks(mappedFilingHistoryDescription);
};

export const mapFilingHistoryDescriptionValues = (description: string, descriptionValues: Record<string, string>) => {
    if (descriptionValues.description) {
        return descriptionValues.description;
    } else {
        return Object.entries(descriptionValues).reduce((newObj, [key, val]) => {
            const value = key.includes("date") ? mapFilingHistoryDate(val, true) : val;
            return newObj.replace("{" + key + "}", value as string);
        }, description);
    }
};

export const mapFilingHistoryDate = (dateString: string, fullMonth: boolean): string => {
    const date = Date.parse(dateString);
    return fullMonth == true ? dayjs(date).format("DD MMMM YYYY") :
        dayjs(date).format("DD MMM YYYY");
};

export const removeAsterisks = (description: string) => {
    return description.replace(/\*/g, "");
};

const getFullFilingHistoryDescription = (descriptionKey: string): string => {
    if (filingHistoryDescriptions === undefined) {
        return descriptionKey;
    } else {
        return filingHistoryDescriptions[DESCRIPTIONS_CONSTANT][descriptionKey] || descriptionKey;
    }
};
