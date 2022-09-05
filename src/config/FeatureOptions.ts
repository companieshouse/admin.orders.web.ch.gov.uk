export class FeatureOptions {

    constructor(public multiItemBasketEnabled: boolean) {
    }
}

export const FEATURE_FLAGS = new FeatureOptions(process.env.ORDERS_SEARCH_MULTIBASKET_ENABLED === "true");
