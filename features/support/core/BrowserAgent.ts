/**
 * Manages interactions with a web browser.
 */
import {SearchResultsTable} from "./SearchResultsTable";

export interface BrowserAgent {
    /**
     * Open a page using the provided path.
     *
     * @param path The path at which the page is located.
     */
    openPage(path: string): Promise<void>;

    /**
     * Verify an element is displayed on the page.
     *
     * @param selector A CSS selector corresponding to an element on the page.
     * @returns true if the element is displayed, otherwise false.
     */
    elementExists(selector: string): Promise<boolean>;

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
     * Find and deserialise the table referred to by the provided selector.
     *
     * @param selector A CSS selector corresponding to a table on the page.
     * @returns {SearchResultsTable} A deserialised {@link SearchResultsTable search results table}.
     * @throws {Error} If the element is not a table or if it cannot be found.
     */
    getTable(selector: string): Promise<SearchResultsTable>;

    /**
     * Input text into the element referred to by the provided selector.
     *
     * @param selector A CSS selector corresponding to an element on the page.
     * @param value The text that will be inputted.
     * @throws {Error} If the element cannot be found.
     */
    inputText(selector: string, value: string): Promise<void>;

    /**
     * Fetch the value of the form field referred to by the provided selector.
     *
     * @param selector A CSS selector corresponding to an element on the page.
     * @throws {Error} If the element cannot be found.
     */
    getFieldValue(selector: string): Promise<string>;

    /**
     * Returns the current location of the browser agent.
     *
     * @returns {Promise<string>} The path of the browser agent's current location.
     */
    getLocation(): Promise<string>;
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
