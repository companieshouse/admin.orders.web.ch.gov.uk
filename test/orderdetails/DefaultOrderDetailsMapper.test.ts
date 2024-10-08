import {Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse, ApiResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import { Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { OrderDetails } from "../../src/orderdetails/OrderDetails";
import { DefaultOrderDetailsMapper } from "../../src/orderdetails/DefaultOrderDetailsMapper";
import {ItemOptions as CertificateItemOptions} from "@companieshouse/api-sdk-node/dist/services/order/certificates/types";

describe("DefaultOrderDetailsMapper", () => {
    it("Maps a successful response for default company details", () => {
        // given
        const serverResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                paidAt: "sometime",
                paymentReference: "somereference",
                etag: "133c845078fc928fc38d409b9ffd732b2356f594",
                deliveryDetails: {
                    poBox: "poBox",
                    country: "UK",
                    forename: "John",
                    companyName: "Weyland Yutani",
                    locality: "Cardiff",
                    postalCode: "CF14 3UZ",
                    region: "Cardiff",
                    surname: "Test",
                    addressLine1: "1 Crown Way",
                    addressLine2: "Maindy"
                },
                items: [
                    {
                        id: "CRT-102416-028334",
                        companyName: "TestDefault",
                        companyNumber: "TT000056",
                        description: "certificate for company TT000056",
                        descriptionIdentifier: "certificate",
                        descriptionValues: {
                            certificate: "certificate for company TT000056",
                            companyNumber: "TT000056"
                        },
                        itemCosts: [
                            {
                                discountApplied: "0",
                                itemCost: "15",
                                calculatedCost: "15",
                                productType: "certificate"
                            }
                        ],
                        itemOptions: {
                            companyStatus: "active",
                            companyType: "plc",
                            deliveryMethod: "postal",
                            deliveryTimescale: "same-day",
                            includeEmailCopy: true,
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            directorDetails: {
                                includeBasicInformation: true,
                                includeOccupation: true,
                                includeNationality: true
                            },
                            includeCompanyObjectsInformation: true,
                            includeGoodStandingInformation: true,
                            registeredOfficeAddressDetails: {
                                includeAddressRecordsType: "current"
                            },
                            secretaryDetails: {
                                includeBasicInformation: true,
                                includeAddress: false,
                                includeAppointmentDate: false
                            }
                        } as CertificateItemOptions,
                        etag: "21ecbbf3391cf856155393cc3d4a737d9a3c233a",
                        kind: "item#certificate",
                        links: {
                            self: "/orderable/certificates/CRT-102416-028334"
                        },
                        quantity: 1,
                        itemUri: "/orderable/certificates/CRT-102416-028334",
                        status: "unknown",
                        postageCost: "0",
                        totalItemCost: "15",
                        postalDelivery: true
                    }
                ],
                kind: "order",
                totalOrderCost: "15",
                reference: "ORD-957216-028332",
                checkedOutBy: {
                    email: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    id: "zXUYdFHZPxwoUcWVEWaoGJkEAfK"
                },
                status: "paid",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new DefaultOrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            model: {
                certificateDetails: {
                    orderNumber: "ORD-957216-028332",
                    orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    companyName: "TestDefault",
                    companyNumber: "TT000056",
                    certificateType: "Incorporation with all company name changes",
                    quantity: 1,
                    statementOfGoodStanding: "Yes",
                    registeredOfficeAddress: "Current address",
                    directors: "Including directors':\n\nOccupation\nNationality\n",
                    secretaries: "Yes",
                    companyObjects: "Yes",
                    isNotDissolution: true
                },
                deliveryInfo: {
                    deliveryMethod: "Express (Orders received before 11am will be sent out the same day. Orders received after 11am will be sent out the next working day)",
                    deliveryDetails: "John Test\nWeyland Yutani\n1 Crown Way\nMaindy\nCardiff\nCardiff\nCF14 3UZ\nUK\n",
                    emailCopyRequired: "Yes"
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });

    it("Maps a successful response for default company details no directors", () => {
        // given
        const serverResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                paidAt: "sometime",
                paymentReference: "somereference",
                etag: "133c845078fc928fc38d409b9ffd732b2356f594",
                deliveryDetails: {
                    poBox: "poBox",
                    country: "UK",
                    forename: "John",
                    locality: "Cardiff",
                    postalCode: "CF14 3UZ",
                    region: "Cardiff",
                    surname: "Test",
                    addressLine1: "1 Crown Way",
                    addressLine2: "Maindy"
                },
                items: [
                    {
                        id: "CRT-102416-028334",
                        companyName: "TestDefault",
                        companyNumber: "TT000056",
                        description: "certificate for company TT000056",
                        descriptionIdentifier: "certificate",
                        descriptionValues: {
                            certificate: "certificate for company TT000056",
                            companyNumber: "TT000056"
                        },
                        itemCosts: [
                            {
                                discountApplied: "0",
                                itemCost: "15",
                                calculatedCost: "15",
                                productType: "certificate"
                            }
                        ],
                        itemOptions: {
                            companyStatus: "active",
                            companyType: "plc",
                            deliveryMethod: "postal",
                            deliveryTimescale: "same-day",
                            includeEmailCopy: false,
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            registeredOfficeAddressDetails: {
                                includeAddressRecordsType: "current"
                            },
                            directorDetails: {},
                            secretaryDetails: {}
                        } as CertificateItemOptions,
                        etag: "21ecbbf3391cf856155393cc3d4a737d9a3c233a",
                        kind: "item#certificate",
                        links: {
                            self: "/orderable/certificates/CRT-102416-028334"
                        },
                        quantity: 1,
                        itemUri: "/orderable/certificates/CRT-102416-028334",
                        status: "unknown",
                        postageCost: "0",
                        totalItemCost: "15",
                        postalDelivery: true
                    }
                ],
                kind: "order",
                totalOrderCost: "15",
                reference: "ORD-957216-028332",
                checkedOutBy: {
                    email: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    id: "zXUYdFHZPxwoUcWVEWaoGJkEAfK"
                },
                status: "paid",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new DefaultOrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            model: {
                certificateDetails: {
                    orderNumber: "ORD-957216-028332",
                    orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    companyName: "TestDefault",
                    companyNumber: "TT000056",
                    certificateType: "Incorporation with all company name changes",
                    quantity: 1,
                    statementOfGoodStanding: "No",
                    registeredOfficeAddress: "Current address",
                    directors: "No",
                    secretaries: "No",
                    companyObjects: "No",
                    isNotDissolution: true
                },
                deliveryInfo: {
                    deliveryMethod: "Express (Orders received before 11am will be sent out the same day. Orders received after 11am will be sent out the next working day)",
                    deliveryDetails: "John Test\n1 Crown Way\nMaindy\nCardiff\nCardiff\nCF14 3UZ\nUK\n",
                    emailCopyRequired: "No"
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });

    it("Maps a successful response for default company in liquidation", () => {
        // given
        const serverResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                paidAt: "sometime",
                paymentReference: "somereference",
                etag: "133c845078fc928fc38d409b9ffd732b2356f594",
                deliveryDetails: {
                    poBox: "poBox",
                    country: "UK",
                    forename: "John",
                    locality: "Cardiff",
                    postalCode: "CF14 3UZ",
                    region: "Cardiff",
                    surname: "Test",
                    addressLine1: "1 Crown Way",
                    addressLine2: "Maindy"
                },
                items: [
                    {
                        id: "CRT-102416-028334",
                        companyName: "TestDefault",
                        companyNumber: "TT000056",
                        description: "certificate for company TT000056",
                        descriptionIdentifier: "certificate",
                        descriptionValues: {
                            certificate: "certificate for company TT000056",
                            companyNumber: "TT000056"
                        },
                        itemCosts: [
                            {
                                discountApplied: "0",
                                itemCost: "15",
                                calculatedCost: "15",
                                productType: "certificate"
                            }
                        ],
                        itemOptions: {
                            companyStatus: "liquidation",
                            companyType: "plc",
                            deliveryMethod: "postal",
                            deliveryTimescale: "standard",
                            includeEmailCopy: false,
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            registeredOfficeAddressDetails: {},
                            directorDetails: {
                                includeBasicInformation: true,
                                includeAddress: false,
                                includeAppointmentDate: false,
                                includeCountryOfResidence: false,
                                includeNationality: false,
                                includeOccupation: false
                            },
                            secretaryDetails: {},
                            includeCompanyObjectsInformation: true,
                            liquidatorsDetails: {
                                includeBasicInformation: true
                            }
                        } as CertificateItemOptions,
                        etag: "21ecbbf3391cf856155393cc3d4a737d9a3c233a",
                        kind: "item#certificate",
                        links: {
                            self: "/orderable/certificates/CRT-102416-028334"
                        },
                        quantity: 1,
                        itemUri: "/orderable/certificates/CRT-102416-028334",
                        status: "unknown",
                        postageCost: "0",
                        totalItemCost: "15",
                        postalDelivery: true
                    }
                ],
                kind: "order",
                totalOrderCost: "15",
                reference: "ORD-957216-028332",
                checkedOutBy: {
                    email: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    id: "zXUYdFHZPxwoUcWVEWaoGJkEAfK"
                },
                status: "paid",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new DefaultOrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            model:  {
                certificateDetails: {
                    orderNumber: "ORD-957216-028332",
                    orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    companyName: "TestDefault",
                    companyNumber: "TT000056",
                    certificateType: "Incorporation with all company name changes",
                    quantity: 1,
                    registeredOfficeAddress: "No",
                    directors: "Yes",
                    secretaries: "No",
                    companyObjects: "Yes",
                    liquidators: "Yes",
                    isNotDissolution: true
                },
                deliveryInfo: {
                    deliveryMethod: "Standard (aim to send out within 10 working days)",
                    deliveryDetails: "John Test\n1 Crown Way\nMaindy\nCardiff\nCardiff\nCF14 3UZ\nUK\n",
                    emailCopyRequired: "Email only available for express dispatch"
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });

    it("Maps a successful response for default company in administration", () => {
        // given
        const serverResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                paidAt: "sometime",
                paymentReference: "somereference",
                etag: "133c845078fc928fc38d409b9ffd732b2356f594",
                deliveryDetails: {
                    poBox: "poBox",
                    country: "UK",
                    forename: "John",
                    locality: "Cardiff",
                    postalCode: "CF14 3UZ",
                    region: "Cardiff",
                    surname: "Test",
                    addressLine1: "1 Crown Way",
                    addressLine2: "Maindy"
                },
                items: [
                    {
                        id: "CRT-102416-028334",
                        companyName: "TestDefault",
                        companyNumber: "TT000056",
                        description: "certificate for company TT000056",
                        descriptionIdentifier: "certificate",
                        descriptionValues: {
                            certificate: "certificate for company TT000056",
                            companyNumber: "TT000056"
                        },
                        itemCosts: [
                            {
                                discountApplied: "0",
                                itemCost: "15",
                                calculatedCost: "15",
                                productType: "certificate"
                            }
                        ],
                        itemOptions: {
                            companyStatus: "administration",
                            companyType: "plc",
                            deliveryMethod: "postal",
                            deliveryTimescale: "standard",
                            includeEmailCopy: false,
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            registeredOfficeAddressDetails: {},
                            directorDetails: {},
                            secretaryDetails: {
                                includeBasicInformation: true,
                                includeAddress: true,
                                includeAppointmentDate: false
                            },
                            administratorsDetails: {}
                        } as CertificateItemOptions,
                        etag: "21ecbbf3391cf856155393cc3d4a737d9a3c233a",
                        kind: "item#certificate",
                        links: {
                            self: "/orderable/certificates/CRT-102416-028334"
                        },
                        quantity: 1,
                        itemUri: "/orderable/certificates/CRT-102416-028334",
                        status: "unknown",
                        postageCost: "0",
                        totalItemCost: "15",
                        postalDelivery: true
                    }
                ],
                kind: "order",
                totalOrderCost: "15",
                reference: "ORD-957216-028332",
                checkedOutBy: {
                    email: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    id: "zXUYdFHZPxwoUcWVEWaoGJkEAfK"
                },
                status: "paid",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new DefaultOrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            model:  {
                certificateDetails: {
                    orderNumber: "ORD-957216-028332",
                    orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    companyName: "TestDefault",
                    companyNumber: "TT000056",
                    certificateType: "Incorporation with all company name changes",
                    quantity: 1,
                    registeredOfficeAddress: "No",
                    directors: "No",
                    secretaries: "Including secretaries':\n\nCorrespondence address\n",
                    companyObjects: "No",
                    administrators: "No",
                    isNotDissolution: true
                },
                deliveryInfo: {
                    deliveryMethod: "Standard (aim to send out within 10 working days)",
                    deliveryDetails: "John Test\n1 Crown Way\nMaindy\nCardiff\nCardiff\nCF14 3UZ\nUK\n",
                    emailCopyRequired: "Email only available for express dispatch"
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });

    it("Maps a successful response for default company details in dissolution", () => {
        // given
        const serverResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
            httpStatusCode: 200,
            resource: {
                paidAt: "sometime",
                paymentReference: "somereference",
                etag: "133c845078fc928fc38d409b9ffd732b2356f594",
                deliveryDetails: {
                    poBox: "poBox",
                    country: "UK",
                    forename: "John",
                    locality: "Cardiff",
                    postalCode: "CF14 3UZ",
                    region: "Cardiff",
                    surname: "Test",
                    addressLine1: "1 Crown Way",
                    addressLine2: "Maindy"
                },
                items: [
                    {
                        id: "CRT-102416-028334",
                        companyName: "TestDefault",
                        companyNumber: "TT000056",
                        description: "certificate for company TT000056",
                        descriptionIdentifier: "certificate",
                        descriptionValues: {
                            certificate: "certificate for company TT000056",
                            companyNumber: "TT000056"
                        },
                        itemCosts: [
                            {
                                discountApplied: "0",
                                itemCost: "15",
                                calculatedCost: "15",
                                productType: "certificate"
                            }
                        ],
                        itemOptions: {
                            companyStatus: "active",
                            companyType: "plc",
                            deliveryMethod: "postal",
                            deliveryTimescale: "standard",
                            includeEmailCopy: false,
                            forename: "John",
                            surname: "Test",
                            certificateType: "dissolution",
                            directorDetails: {
                                includeBasicInformation: true,
                                includeOccupation: true,
                                includeNationality: true
                            },
                            includeCompanyObjectsInformation: true,
                            includeGoodStandingInformation: true,
                            registeredOfficeAddressDetails: {
                                includeAddressRecordsType: "current"
                            },
                            secretaryDetails: {
                                includeBasicInformation: true,
                                includeAddress: false,
                                includeAppointmentDate: false
                            }
                        } as CertificateItemOptions,
                        etag: "21ecbbf3391cf856155393cc3d4a737d9a3c233a",
                        kind: "item#certificate",
                        links: {
                            self: "/orderable/certificates/CRT-102416-028334"
                        },
                        quantity: 1,
                        itemUri: "/orderable/certificates/CRT-102416-028334",
                        status: "unknown",
                        postageCost: "0",
                        totalItemCost: "15",
                        postalDelivery: true
                    }
                ],
                kind: "order",
                totalOrderCost: "15",
                reference: "ORD-957216-028332",
                checkedOutBy: {
                    email: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    id: "zXUYdFHZPxwoUcWVEWaoGJkEAfK"
                },
                status: "paid",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        const mapper = new DefaultOrderDetailsMapper();

        // when
        const result = mapper.map(serverResponse);

        // then
        expect(result).toEqual({
            status: "SUCCESS",
            model: {
                certificateDetails: {
                    orderNumber: "ORD-957216-028332",
                    orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                    companyName: "TestDefault",
                    companyNumber: "TT000056",
                    certificateType: "Dissolution with all company name changes",
                    statementOfGoodStanding: "Yes",
                    quantity: 1,
                    registeredOfficeAddress: "Current address",
                    directors: "Including directors':\n\nOccupation\nNationality\n",
                    secretaries: "Yes",
                    companyObjects: "Yes",
                    isNotDissolution: false
                },
                deliveryInfo: {
                    deliveryMethod: "Standard (aim to send out within 10 working days)",
                    deliveryDetails: "John Test\n1 Crown Way\nMaindy\nCardiff\nCardiff\nCF14 3UZ\nUK\n",
                    emailCopyRequired: "Email only available for express dispatch"
                },
                paymentDetails: {
                    paymentReference: "somereference",
                    fee: "£15"
                }
            } as OrderDetails
        });
    });
});
