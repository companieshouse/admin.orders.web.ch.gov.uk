import {GreetingSteps} from "./GreetingSteps";
import {expect} from "chai";
import {BrowserAgent} from "../core/BrowserAgent";
import "reflect-metadata";

export interface GreetingPage {
    openHelloPage(): Promise<void>
    clickGoodbye(): Promise<void>
    clickHello(): Promise<void>
    verify(): Promise<void>
}

export class NoPage implements GreetingPage {
    public constructor(private greetingSteps: GreetingSteps, private interactor: BrowserAgent) {
    }

    public async openHelloPage(): Promise<void> {
        await this.interactor.openPage("/orders-admin/hello");
        this.greetingSteps.currentPage = this.greetingSteps.helloPageState;
    }

    public async clickGoodbye(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickHello(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async verify(): Promise<void> {
        throw new Error("Invalid operation");
    }
}

export class HelloPage implements GreetingPage {
    public constructor(private greetingSteps: GreetingSteps, private interactor: BrowserAgent) {
    }

    public async openHelloPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickGoodbye(): Promise<void> {
        await this.interactor.clickElement("#link");
        this.greetingSteps.currentPage = this.greetingSteps.goodbyePageState;
    }

    public async clickHello(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async verify(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        expect(headingText).equals("Hello!");
    }
}

export class GoodbyePage implements GreetingPage {
    public constructor(private greetingSteps: GreetingSteps, private interactor: BrowserAgent) {
    }

    public async openHelloPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickGoodbye(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickHello(): Promise<void> {
        await this.interactor.clickElement("#link");
        this.greetingSteps.currentPage = this.greetingSteps.helloPageState;
    }

    public async verify(): Promise<void> {
        const headingText = await this.interactor.getElementText("h1");
        expect(headingText).equals("Goodbye!");
    }
}

