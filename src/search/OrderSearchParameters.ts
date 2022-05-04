import {SearchCriteria} from "./SearchCriteria";

export class OrderSearchParameters {
    constructor(public searchCriteria: SearchCriteria, public token: string) {
    }
}
