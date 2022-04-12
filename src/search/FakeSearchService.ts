import {Service} from "typedi";
import "reflect-metadata";
import {SearchService} from "./SearchService";
import {OrderSearchParameters} from "./OrderSearchParameters";
import {SearchResults} from "./SearchResults";
import {Status} from "../core/Status";
import {OrderSummary} from "./OrderSummary";

@Service()
export class FakeSearchService implements SearchService {
    async findOrders(searchParameters: OrderSearchParameters): Promise<SearchResults> {
        return new SearchResults(Status.SUCCESS, [
            OrderSummary.builder("ORD-123123-123123")
                .withDetailHref("/orders-admin/order/ORD-123123-123123")
                .withEmail("demo@ch.gov.uk")
                .withProductLine("Certificate")
                .withOrderDate("11/04/2022")
                .withPaymentStatus("Paid")
                .addExtraProperty("companyNumber", "12345678")
                .build(),
            OrderSummary.builder("ORD-321321-321321")
                .withEmail("demo@ch.gov.uk")
                .withProductLine("Missing image")
                .withOrderDate("11/04/2022")
                .withPaymentStatus("Paid")
                .addExtraProperty("companyNumber", "87654321")
                .build()
        ]);
    }
}
