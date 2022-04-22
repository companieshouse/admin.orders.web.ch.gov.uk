import {Service} from "typedi";
import "reflect-metadata";
import {SearchService} from "./SearchService";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchResults} from "./SearchResults";
import {Status} from "../core/Status";

@Service()
export class FakeSearchService implements SearchService {
    async findOrders(searchParameters: OrderSearchParameters): Promise<SearchResults> {
        if (searchParameters.searchCriteria.id === "nonexistent") {
            return new SearchResults(Status.SUCCESS, []);
        } else if (searchParameters.searchCriteria.id === "error") {
            return new SearchResults(Status.SERVER_ERROR, []);
        } else {
            return new SearchResults(Status.SUCCESS, [
                {
                    id: "ORD-123123-123123",
                    detailHref: "/orders-admin/order/ORD-123123-123123",
                    email: "demo@ch.gov.uk",
                    productLine: "Certificate",
                    orderDate: "11/04/2022",
                    paymentStatus: "Paid",
                    extraProperties: {
                        companyNumber: "12345678"
                    }
                },
                {
                    id: "ORD-321321-321321",
                    email: "demo@ch.gov.uk",
                    productLine: "Missing image",
                    orderDate: "11/04/2022",
                    paymentStatus: "Paid",
                    extraProperties: {
                        companyNumber: "87654321"
                    }
                }
            ]);
        }
    }
}
