import {Status} from "../core/Status";
import {OrderSummary} from "./OrderSummary";

export class SearchResults {
    constructor(public readonly status: Status, public readonly orderSummaries: OrderSummary[]) {
    }
}
