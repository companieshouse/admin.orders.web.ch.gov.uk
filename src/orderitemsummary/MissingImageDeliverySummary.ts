export class MissingImageDeliverySummary {

    constructor(public orderId?: string,
                public itemId?: string,
                public companyName?: string,
                public companyNumber?: string,
                public date?: string,
                public type?: string,
                public description?: string,
                public fee?: string,
                public emailAddress?: string,
                public backLinkUrl?: string) {
    }
}
