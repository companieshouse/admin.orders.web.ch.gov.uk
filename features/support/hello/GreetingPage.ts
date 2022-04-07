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
    private _greetingSteps: GreetingSteps;
    private _interactor: BrowserAgent;

    public constructor(_greetingSteps: GreetingSteps, _interactor: BrowserAgent) {
        this._greetingSteps = _greetingSteps;
        this._interactor = _interactor;
    }

    public async openHelloPage(): Promise<void> {
        await this._interactor.openPage("/hello");
        this._greetingSteps.currentPage = this._greetingSteps.helloPageState;
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
    private _greetingSteps: GreetingSteps;
    private _interactor: BrowserAgent;

    public constructor(_greetingSteps: GreetingSteps, _interactor: BrowserAgent) {
        this._greetingSteps = _greetingSteps;
        this._interactor = _interactor;
    }

    public async openHelloPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickGoodbye(): Promise<void> {
        await this._interactor.clickElement("#link");
        this._greetingSteps.currentPage = this._greetingSteps.goodbyePageState;
    }

    public async clickHello(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async verify(): Promise<void> {
        const headingText = await this._interactor.getElementText("h1");
        expect(headingText).equals("Hello!");
    }
}

export class GoodbyePage implements GreetingPage {
    private _greetingSteps: GreetingSteps;
    private _interactor: BrowserAgent;

    public constructor(_greetingSteps: GreetingSteps, _interactor: BrowserAgent) {
        this._greetingSteps = _greetingSteps;
        this._interactor = _interactor;
    }

    public async openHelloPage(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickGoodbye(): Promise<void> {
        throw new Error("Invalid operation");
    }

    public async clickHello(): Promise<void> {
        await this._interactor.clickElement("#link");
        this._greetingSteps.currentPage = this._greetingSteps.helloPageState;
    }

    public async verify(): Promise<void> {
        const headingText = await this._interactor.getElementText("h1");
        expect(headingText).equals("Goodbye!");
    }
}

