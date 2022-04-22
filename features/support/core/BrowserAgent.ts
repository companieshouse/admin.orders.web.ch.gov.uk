/**
 * Manages interactions with a web browser.
 */
export interface BrowserAgent {
    /**
     * Open a page using the provided path.
     *
     * @param path The path at which the page is located.
     */
    openPage(path: string): Promise<void>;

    /**
     * Retrieve text from the element referred to by the provided selector.
     * Leading and trailing whitespace will be trimmed.
     *
     * @param selector A CSS selector corresponding to an element on the page.
     * @returns {Promise<string>} Trimmed element text.
     * @throws {Error} If the element cannot be found.
     */
    getElementText(selector: string): Promise<string>;

    /**
     * Click the element referred to by the provided selector.
     *
     * @param selector A CSS selector corresponding to an element on the page.
     * @throws {Error} If the element cannot be found.
     */
    clickElement(selector: string): Promise<void>;

    /**
     * Input text into the element referred to by the provided selector.
     *
     * @param selector A CSS selector corresponding to an element on the page.
     * @param value The text that will be inputted.
     * @throws {Error} If the element cannot be found.
     */
    inputText(selector: string, value: string): Promise<void>;
}

/**
 * A service that can be started or stopped on-demand.
 */
export interface AgentService {
    /**
     * Start the service.
     *
     * @param args
     */
    start(args: string): Promise<void>;

    /**
     * Stop the service.
     */
    stop(): Promise<void>;
}
