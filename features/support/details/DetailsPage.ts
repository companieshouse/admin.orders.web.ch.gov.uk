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
    validateInvalidOrderError(): Promise<void>;
    validateNotFoundError(): Promise<void>;
    validateServiceUnvailableError(): Promise<void>;
}

 
export abstract class AbstractDetailsPage implements DetailsPage {

    openPage(): Promise<void>{
        throw new Error("Invalid operation");
    }

    anticipateValidOrder(): Promise<void>{
        throw new Error("Invalid operation");
    }

    anticipateInvalidOrder(): Promise<void>{
        throw new Error("Invalid operation");
    }

    anticipateOrderNotFound(): Promise<void>{
        throw new Error("Invalid operation");
    }

    anticipateServiceUnavailable(): Promise<void>{
        throw new Error("Invalid operation");
    }

    clickBrowserBack(): Promise<void>{
        throw new Error("Invalid operation");
    }

    validateOrderDetails(data: string[][]): Promise<void>{
        throw new Error("Invalid operation");
    }

    validateDeliveryDetails(data: string[][]): Promise<void>{
        throw new Error("Invalid operation");
    }

    validatePaymentDetails(data: string[][]): Promise<void>{
        throw new Error("Invalid operation");
    }

    validateLocation(path: string): Promise<void>{
        throw new Error("Invalid operation");
    }

    validateInvalidOrderError(): Promise<void> {
        throw new Error("Invalid operation");
    }

    validateNotFoundError(): Promise<void> {
        throw new Error("Invalid operation");
    }

    validateServiceUnvailableError(): Promise<void> {
        throw new Error("Invalid operation");
    }
}
// Valid transitions:
    //
    // Open page
    // Anticipate valid order
    // Anticipate invalid order
    // Anticipate order not found
    // Anticipate service unavailable
    // Anticipate click browser back button

// Valid actions
    //
    // Validate order details
    // Validate delivery details
    // Validate payment details
    // Validate browser location
    // Validate invalid order error
    // Validate page not found error
    // Validate service unavailable error 

// Valid states:
    //
    // Not loaded
export class DetailsPageNotLoaded extends AbstractDetailsPage {

    openPage(): Promise<void>{
        throw new Error("Invalid operation");
    }

    anticipateValidOrder(): Promise<void>{
        throw new Error("Invalid operation");
    }

    anticipateInvalidOrder(): Promise<void>{
        throw new Error("Invalid operation");
    }

    anticipateOrderNotFound(): Promise<void>{
        throw new Error("Invalid operation");
    }

    anticipateServiceUnavailable(): Promise<void>{
        throw new Error("Invalid operation");
    }   
}
    // Loaded
export class DetailsPageLoaded extends AbstractDetailsPage {

    clickBrowserBack(): Promise<void>{
        throw new Error("Invalid operation");
    }

    validateOrderDetails(data: string[][]): Promise<void>{
        throw new Error("Invalid operation");
    }

    validateDeliveryDetails(data: string[][]): Promise<void>{
        throw new Error("Invalid operation");
    }

    validatePaymentDetails(data: string[][]): Promise<void>{
        throw new Error("Invalid operation");
    }
}
    // Invalid order
export class DetailsPageInvaildOrder extends AbstractDetailsPage {

    validateInvalidOrderError(): Promise<void> {
        throw new Error("Invalid operation");
    }
}
    // Not found
export class DetailsPageNotFound extends AbstractDetailsPage {

    validateNotFoundError(): Promise<void> {
        throw new Error("Invalid operation");
    }
}
    // Service unavailable
export class DetailsPageUnavailable extends AbstractDetailsPage {
    
    validateServiceUnvailableError(): Promise<void> {
        throw new Error("Invalid operation");
    }

}