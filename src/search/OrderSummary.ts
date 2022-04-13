export class OrderSummary {
    public id?: string;
    public detailHref?: string;
    public email?: string;
    public productLine?: string;
    public orderDate?: string;
    public paymentStatus?: string;
    public priority?: string;
    public extraProperties: { [key: string]: string } = {};
}
