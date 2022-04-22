import {AgentService, BrowserAgent} from "./BrowserAgent";
import {Service} from "typedi";
import "reflect-metadata";
import {Builder, By, WebDriver} from "selenium-webdriver";
import {SearchResultsRow, SearchResultsTable} from "./SearchResultsTable";

@Service("selenium")
export class SeleniumBrowserAgent implements BrowserAgent, AgentService {

    private driver: WebDriver | null = null;
    private baseUri: string | null = null;

    public async start(baseUri: string): Promise<void> {
        if (this.driver != null) {
            throw new Error("Driver already started");
        }
        this.driver = await new Builder()
            .forBrowser("chrome")
            .build();
        this.baseUri = baseUri;
        await this.driver.manage().setTimeouts({implicit: 5});
    }

    public async stop(): Promise<void> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        await this.driver.quit();
    }

    public async openPage(path: string): Promise<void> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        await this.driver.get(this.baseUri + path);
    }

    public async elementExists(selector: string): Promise<boolean> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        try {
            await this.driver.findElement(By.css(selector));
            return true;
        } catch(error) {
            return false;
        }
    }

    public async clickElement(selector: string): Promise<void> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        const element = await this.driver.findElement(By.css(selector));
        await element.click();
    }

    public async getTable(selector: string): Promise<SearchResultsTable> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        const table = await this.driver.findElement(By.css(selector));
        const tagName = await table.getTagName();
        if (tagName !== "table") {
            throw new Error("Expected " + selector + " to refer to a table but got: " + tagName);
        }
        const headingNames = [];
        const headings = await table.findElements(By.css("thead tr th"));
        for(const element of headings) {
            headingNames.push(await element.getText());
        }
        const tableRows = [];
        const rows = await table.findElements(By.css("tbody tr"));
        for(const row of rows) {
            const rowData = new Map<string, string>();
            const data = await row.findElements(By.css("td"));
            for(const [index, element] of data.entries()) {
                rowData.set(headingNames[index], await element.getText());
            }
            try {
                await data[0].findElement(By.css("a"));
                tableRows.push(new SearchResultsRow(rowData, true));
            } catch (error) {
                tableRows.push(new SearchResultsRow(rowData, false));
            }
        }
        return new SearchResultsTable(tableRows);
    }

    public async getElementText(selector: string): Promise<string> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        const element = await this.driver.findElement(By.css(selector));
        return await element.getText();
    }

    public async inputText(selector: string, value: string): Promise<void> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        const element = await this.driver.findElement(By.css(selector));
        await element.sendKeys(value);
    }

    public async getFieldValue(selector: string): Promise<string> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        const element = await this.driver.findElement(By.css(selector));
        return await element.getAttribute("value");
    }

    public async isAHyperlink(selector: string): Promise<boolean> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        const element = await this.driver.findElement(By.css(selector));
        return await element.getTagName() === "A";
    }
}
