export class CertifiedCopySummary {
    constructor(public orderId?: string,
                public itemId?: string,
                public companyName?: string,
                public companyNumber?: string,
                public deliveryMethod?: string,
                public dateFiled?: string,
                public type?: string,
                public description?: string,
                public fee?: string,
                public backLinkUrl?: string) {
    }
}
