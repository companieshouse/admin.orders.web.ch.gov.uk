export interface BrowserAgent {
    openPage(url: string): Promise<void>;
    getElementText(selector: string): Promise<string>;
    clickElement(selector: string): Promise<void>;
    inputText(selector: string, value: string): Promise<void>;
}

export interface AgentService {
    start(args: string): Promise<void>;
    stop(): Promise<void>;
}
