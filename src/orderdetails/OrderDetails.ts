export class OrderDetails {
    public certificateDetails?: CertificateDetails
    public deliveryInfo?: DeliveryInfo
    public paymentDetails?: PaymentDetails
}

export class CertificateDetails {
    public orderNumber?: string
    public orderedBy?: string;
    public companyName?: string;
    public companyNumber?: string;
    public quantity?: number;
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
    public isNotDissolution?: boolean;
}

class DeliveryInfo {
    public deliveryMethod?: string;
    public deliveryDetails?: string;
    public emailCopyRequired?: string;
}

class PaymentDetails {
    public paymentReference?: string;
    public fee?: string;
}