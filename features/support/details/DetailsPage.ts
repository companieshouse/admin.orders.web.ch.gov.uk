export interface DetailsPage {
    // Open page
    openPage(): Promise<void>;
    anticipateValidOrder(): Promise<void>;
    anticipateInvalidOrder(): Promise<void>;
    anticipateOrderNotFound(): Promise<void>;
    anticipateServiceUnavailable(): Promise<void>;
    clickBrowserBack(): Promise<void>;
    validateOrderDetails(data: string[][]): Promise<void>;
    validateDeliveryDetails(data: string[][]): Promise<void>;
    validatePaymentDetails(data: string[][]): Promise<void>;
    validateLocation(path: string): Promise<void>;
}
