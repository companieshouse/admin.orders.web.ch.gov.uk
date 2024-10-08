export class OrderSummary {
    public orderReference?: string;
    public itemSummary: ItemSummary[] = [];
    public hasDeliverableItems: boolean = false;
    public deliveryDetails?: DeliveryDetails;
    public paymentDetails?: PaymentDetails;
    public backLinkUrl?: string;
}

export class ItemSummary {
    public id?: string;
    public orderType?: string;
    public companyNumber?: string;
    public deliveryMethod?: string;
    public quantity?: number;
    public fee?: string;
    public itemLink?: string;
}

export class PaymentDetails {
    public paymentStatus?: string;
    public paymentReference?: string;
    public amountPaid?: string;
}

export class DeliveryDetails {
    public deliveryAddress?: string;
}
