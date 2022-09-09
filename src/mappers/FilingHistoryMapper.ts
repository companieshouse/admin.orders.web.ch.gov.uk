import "reflect-metadata";
import fs from "fs";
import yaml from "js-yaml";
import dayjs from "dayjs";
import { Service } from "typedi";
import {ServerPaths} from "../application/ServerPaths";
import {createLogger} from "@companieshouse/structured-logging-node";

const FILING_HISTORY_DESCRIPTIONS_PATH: string = "api-enumerations/filing_history_descriptions.yml";
const DESCRIPTIONS_CONSTANT: string = "description";

@Service()
export class FilingHistoryMapper {

    private static logger = createLogger("FilingHistoryMapper");

    private filingHistoryDescriptions: any;

    constructor(private paths: ServerPaths) {
        try {
            this.filingHistoryDescriptions = yaml.safeLoad(fs.readFileSync(`${this.paths.applicationRootDir}/${FILING_HISTORY_DESCRIPTIONS_PATH}`, "utf8"));
        } catch (error) {
            if (error instanceof Error) {
                FilingHistoryMapper.logger.error(error.message);
            }
        }
    }

    mapFilingHistory(description: string, descriptionValues: Record<string, string>): string {
        const descriptionFromFile = this.getFullFilingHistoryDescription(description);
        const mappedFilingHistoryDescription = this.mapFilingHistoryDescriptionValues(descriptionFromFile, descriptionValues || {});
        return this.removeAsterisks(mappedFilingHistoryDescription);
    }

    mapFilingHistoryDescriptionValues(description: string, descriptionValues: Record<string, string>) {
        if (descriptionValues.description) {
            return descriptionValues.description;
        } else {
            return Object.entries(descriptionValues).reduce((newObj, [key, val]) => {
                const value = key.includes("date") ? this.mapFilingHistoryDate(val, true) : val;
                return newObj.replace("{" + key + "}", value as string);
            }, description);
        }
    }

    mapFilingHistoryDate(dateString: string, fullMonth: boolean): string {
        const date = Date.parse(dateString);
        return fullMonth == true ? dayjs(date).format("DD MMMM YYYY") :
            dayjs(date).format("DD MMM YYYY");
    }

    removeAsterisks(description: string) {
        return description.replace(/\*/g, "");
    }

    getFullFilingHistoryDescription(descriptionKey: string): string {
        if (this.filingHistoryDescriptions === undefined) {
            return descriptionKey;
        } else {
            return this.filingHistoryDescriptions[DESCRIPTIONS_CONSTANT][descriptionKey] || descriptionKey;
        }
    }
}
