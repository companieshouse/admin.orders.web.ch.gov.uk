import {AgentService, BrowserAgent} from "./BrowserAgent";
import {Service} from "typedi";
import "reflect-metadata";
import {Builder, By, WebDriver} from "selenium-webdriver";

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
            console.warn("Driver not started");
            return;
        }
        await this.driver.get(this.baseUri + path);
    }

    public async clickElement(selector: string): Promise<void> {
        if (this.driver == null) {
            throw new Error("Driver not started");
        }
        const element = await this.driver.findElement(By.css(selector));
        await element.click();
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
}
