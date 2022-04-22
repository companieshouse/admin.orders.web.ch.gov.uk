import { given, when, then, binding } from "cucumber-tsflow";
import {GreetingPage, NoPage, HelloPage, GoodbyePage} from "./GreetingPage";
import {Container} from "typedi";
import "reflect-metadata";
import {SeleniumBrowserAgent} from "../core/SeleniumBrowserAgent";

@binding()
export class GreetingSteps {
    readonly helloPageState: HelloPage;
    readonly goodbyePageState: GoodbyePage;

    private _currentPage: GreetingPage;
    private _memory: Map<string, string>;

    constructor(browserAgent: SeleniumBrowserAgent = Container.get(SeleniumBrowserAgent)) {
        this.helloPageState = new HelloPage(this, browserAgent);
        this.goodbyePageState = new GoodbyePage(this, browserAgent);
        this._currentPage = new NoPage(this, browserAgent);
        this._memory = new Map<string, string>();
    }

    @given(/^I have navigated to the hello page$/)
    @when(/^I navigate to the hello page$/)
    public async navigateToHelloPage(): Promise<void> {
        await this._currentPage.openHelloPage();
    }

    @when(/^I click goodbye$/)
    public async clickGoodbye(): Promise<void> {
        await this._currentPage.clickGoodbye();
    }

    @when(/^I click hello$/)
    public async clickHello(): Promise<void> {
        await this._currentPage.clickHello();
    }

    @then(/^The main heading should be "Hello!"$/)
    @then(/^I should be taken to the goodbye page$/)
    public async verifyHelloPage(): Promise<void> {
        await this._currentPage.verify();
    }

    set currentPage(_currentPage: GreetingPage) {
        this._currentPage = _currentPage;
    }

    public getValue(key: string): string {
        return this._memory.get(key) || "";
    }

    public setValue(key: string, value: string): void {
        this._memory.set(key, value);
    }
    
}
