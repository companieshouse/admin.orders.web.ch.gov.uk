import {AgentService, BrowserAgent} from "./BrowserAgent";
import {Service} from "typedi";
import "reflect-metadata";
import { URL } from "url";
import {SearchResultsRow, SearchResultsTable} from "./SearchResultsTable";
import {OrderDataRow, OrderDataList} from "./OrderDataList";
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
                const link = await element.querySelector("a");
                if (link) {
                    rowData.set(headingNames[index], link.innerHTML.trim());
                } else {
                    rowData.set(headingNames[index], element.innerHTML.trim());
                }
            }
            tableRows.push(new SearchResultsRow(rowData, !!await data[0].querySelector("a")));
        }
        return new SearchResultsTable(tableRows);
    }

    async getList(selector: string): Promise<OrderDataList> {
        if (this.browser == null) {
            throw new Error("Driver not started");
        }
        const list = await this.browser.querySelector(selector);
        if (list.nodeName !== "DL") {
            throw new Error("Element " + selector + " is not a data list.");
        }
        const headingNames = [];
        const headings = await list.querySelectorAll("dt");
        for(const heading of headings) {
            headingNames.push(heading.innerHTML.trim());
        }

        const dataValues = [];
        const valuesList = await list.querySelectorAll("dd");
        for(const value of valuesList) {
            dataValues.push(value.innerHTML.trim());
        }
        const listData = [];

        for (let i=0; i<headingNames.length; i++) {
            const rowData = new Map<string, string>();
            rowData.set(headingNames[i], dataValues[i]);
            listData.push(new OrderDataRow(rowData));
        }

        return new OrderDataList(listData);
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

    async getFieldValue(selector: string): Promise<string> {
        if (this.browser == null) {
            throw new Error("Driver not started");
        }
        const element = await this.browser.querySelector(selector);
        return element.value;
    }

    async getLocation(): Promise<string> {
        if (this.browser == null) {
            throw new Error("Driver not started");
        }
        const url = this.browser.location.href;
        const urlModel = new URL(url);
        return urlModel.pathname;
    }
}
