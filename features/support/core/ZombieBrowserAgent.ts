import {AgentService, BrowserAgent} from "./BrowserAgent";
import {Service} from "typedi";
import "reflect-metadata";
import { URL } from "url";
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
