export class OrderDetails {
    public certificateDetails?: CertificateDetails
    public deliveryInfo?: DeliveryInfo
    public paymentDetails?: PaymentDetails
}

class CertificateDetails {
    public readonly orderNumber?: string
    public orderedBy?: string;
    public companyName?: string;
    public companyNumber?: string;
    public certificateType?: string;
    public statementOfGoodStanding?: string;
    public registeredOfficeAddress?: string;
    public principalPlaceOfBusiness?: string;
    public directors?: string;
    public secretaries?: string;
    public designatedMembers?: string;
    public members?: string;
    public generalPartners?: string;
    public limitedPartners?: string;
    public generalNatureOfBusiness?: string;
    public companyObjects?: string;
    public liquidators?: string;
    public administrators?: string;
}

class DeliveryInfo {
    public deliveryMethod?: string;
    public deliveryDetails?: string;
}

class PaymentDetails {
    public paymentReference?: string;
    public fee?: string;
}