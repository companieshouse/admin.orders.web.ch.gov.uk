export class OrderSummary {
    public constructor(public id: string,
                        public detailHref: string | undefined,
                        public email: string | undefined,
                        public productLine: string | undefined,
                        public orderDate: string | undefined,
                        public paymentStatus: string | undefined,
                        public priority: string | undefined,
                        public extraProperties: Map<string, string>) {
    }

    static builder(id: string): OrderSummaryBuilder {
        return new OrderSummaryBuilder(id);
    }
}

export class OrderSummaryBuilder {
    private readonly id: string;
    private detailHref: string | undefined;
    private email: string | undefined;
    private productLine: string | undefined;
    private orderDate: string | undefined;
    private paymentStatus: string | undefined;
    private priority: string | undefined;
    private readonly extraProperties: Map<string, string>;

    public constructor(id: string) {
        this.id = id;
        this.extraProperties = new Map<string, string>();
    }

    withDetailHref(detailHref: string): OrderSummaryBuilder {
        this.detailHref = detailHref;
        return this;
    }

    withEmail(email: string): OrderSummaryBuilder {
        this.email = email;
        return this;
    }

    withProductLine(productLine: string): OrderSummaryBuilder {
        this.productLine = productLine;
        return this;
    }

    withOrderDate(orderDate: string): OrderSummaryBuilder {
        this.orderDate = orderDate;
        return this;
    }

    withPaymentStatus(paymentStatus: string): OrderSummaryBuilder {
        this.paymentStatus = paymentStatus;
        return this;
    }

    withPriority(priority: string): OrderSummaryBuilder {
        this.priority = priority;
        return this;
    }

    addExtraProperty(key: string, value: string): OrderSummaryBuilder {
        this.extraProperties.set(key, value);
        return this;
    }

    build(): OrderSummary {
        return new OrderSummary(
            this.id,
            this.detailHref,
            this.email,
            this.productLine,
            this.orderDate,
            this.paymentStatus,
            this.priority,
            this.extraProperties
        );
    }
}
