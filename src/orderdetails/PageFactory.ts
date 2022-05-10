import {Service} from "typedi";
import "reflect-metadata";
import {ViewModel} from "../core/ViewModel";
import {GlobalPageFactory} from "../core/GlobalPageFactory";
import {ErrorPageBuildable} from "../core/ErrorPageBuildable";
import { OrderDetailsResults } from "./OrderDetailsResults";
import { OrderDetailsPage } from "./OrderDetailsPage";
import { OrderDetailsComponent } from "./OrderDetailsComponent";
import { DeliveryDetailsComponent } from "./DeliveryDetailsComponent";
import { PaymentDetailsComponent } from "./PaymentDetailsComponent";

@Service()
export class PageFactory implements ErrorPageBuildable {
    private static readonly ORDER_DETAILS_PAGE_TITLE = "Order Details";

    constructor(private globalPageFactory: GlobalPageFactory) {
    }

    public buildOrderDetailsPage(results: OrderDetailsResults): ViewModel {
        const page = new OrderDetailsPage(PageFactory.ORDER_DETAILS_PAGE_TITLE);
        page.add(new OrderDetailsComponent(results.model));
        page.add(new DeliveryDetailsComponent(results.model));
        page.add(new PaymentDetailsComponent(results.model))
        return page.render();
    }

    buildServiceUnavailable(): ViewModel {
        return this.globalPageFactory.buildServiceUnavailable();
    }

    buildUnauthorised(): ViewModel {
        return this.globalPageFactory.buildUnauthorised();
    }

    buildNotFound(): ViewModel {
        return this.globalPageFactory.buildNotFound();
    }
}
