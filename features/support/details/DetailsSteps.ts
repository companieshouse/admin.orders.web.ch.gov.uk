import {binding} from "cucumber-tsflow/dist";
import "reflect-metadata";

@binding()
export class DetailsSteps {
    // TODO:
    //
    // Valid states:
    //
    // Not loaded
    // Loaded
    // Invalid order
    // Not found
    // Service unavailable
    //
    // Valid transitions:
    //
    // Open page
    // Anticipate valid order
    // Anticipate invalid order
    // Anticipate order not found
    // Anticipate service unavailable
    // Anticipate click browser back button
    //
    // Valid actions
    //
    // Validate order details
    // Validate delivery details
    // Validate payment details
    // Validate browser location
}
