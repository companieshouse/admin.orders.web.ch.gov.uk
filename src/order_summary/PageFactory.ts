import "reflect-metadata";
import {Service} from "typedi";
import {ErrorPageBuildable} from "../core/ErrorPageBuildable";
import {GlobalPageFactory} from "../core/GlobalPageFactory";
import {ViewModel} from "../core/ViewModel";
import {
    DeliveryDetailsComponent,
    ItemDetailsComponent,
    OrderSummaryDetailsComponent,
    OrderSummaryPage, PaymentDetailsComponent
} from "./OrderSummaryPage";
import {OrderSummary} from "./OrderSummary";

@Service()
export class PageFactory implements ErrorPageBuildable {

    private static readonly PAGE_TITLE = "Order Details";

    constructor(private globalPageFactory: GlobalPageFactory) {
    }

    buildOrderSummaryPage(orderSummary: OrderSummary): ViewModel {
        const pageModel = new OrderSummaryPage(PageFactory.PAGE_TITLE);
        const content = new OrderSummaryDetailsComponent(orderSummary);
        pageModel.add(content);
        orderSummary.itemSummary.forEach(summary => content.add(new ItemDetailsComponent(summary)));
        pageModel.add(new DeliveryDetailsComponent(orderSummary));
        pageModel.add(new PaymentDetailsComponent(orderSummary));
        return pageModel.render();
    }

    buildNotFound(): ViewModel {
        return this.globalPageFactory.buildNotFound();
    }

    buildServiceUnavailable(): ViewModel {
        return this.globalPageFactory.buildServiceUnavailable();
    }

    buildUnauthorised(): ViewModel {
        return this.globalPageFactory.buildUnauthorised();
    }
}
