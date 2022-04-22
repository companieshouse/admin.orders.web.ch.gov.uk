import {AgentService, BrowserAgent} from "./BrowserAgent";
import {Service} from "typedi";
import "reflect-metadata";
import { URL } from "url";
import {SearchResultsRow, SearchResultsTable} from "./SearchResultsTable";
import {By} from "selenium-webdriver";
const Browser = require("zombie");

@Service("zombie")
export class ZombieBrowserAgent implements BrowserAgent, AgentService {
    private browser: any;

    async start(baseUrl: string): Promise<void> {
        const url = new URL(baseUrl);
        Browser.localhost(url.hostname, url.port);
        this.browser = new Browser();
    }

    async stop(): Promise<void> {
    }

    async openPage(url: string): Promise<void> {
        if (this.browser == null) {
            throw new Error("Driver not started");
        }
        await this.browser.visit(url);
        this.browser.assert.success();
    }

    async elementExists(selector: string): Promise<boolean> {
        if (this.browser == null) {
            throw new Error("Driver not started");
        }
        const element = await this.browser.querySelector(selector);
        return !!element;
    }

    async clickElement(selector: string): Promise<void> {
        if (this.browser == null) {
            throw new Error("Driver not started");
        }
        const element = await this.browser.querySelector(selector);
        if (element.nodeName === "BUTTON") {
            await this.browser.pressButton(selector);
        } else {
            await this.browser.click(selector);
        }
    }

    async getTable(selector: string): Promise<SearchResultsTable> {
        if (this.browser == null) {
            throw new Error("Driver not started");
        }
        const table = await this.browser.querySelector(selector);
        if (table.nodeName !== "TABLE") {
            throw new Error("Element " + selector + " is not a table.");
        }
        const headingNames = [];
        const headings = await table.querySelectorAll("thead tr th");
        for(const heading of headings) {
            headingNames.push(heading.innerHTML.trim());
        }
        const tableRows = [];
        const rows = await table.querySelectorAll("tbody tr");
        for(const row of rows) {
            const rowData = new Map<string, string>();
            const data = await row.querySelectorAll("td");
            for(const [index, element] of data.entries()) {
                rowData.set(headingNames[index], element.innerHTML.trim());
            }
            tableRows.push(new SearchResultsRow(rowData));
        }
        return new SearchResultsTable(tableRows);
    }



    async getElementText(selector: string): Promise<string> {
        if (this.browser == null) {
            throw new Error("Driver not started");
        }
        const element = await this.browser.querySelector(selector);
        return element.innerHTML.trim();
    }

    async inputText(selector: string, value: string): Promise<void> {
        if (this.browser == null) {
            throw new Error("Driver not started");
        }
        await this.browser.fill(selector, value);
    }
}
