import {jest} from "@jest/globals";
import {OrderDetailsService} from "../../src/orderdetails/OrderDetailsService";
import {ApiResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import {Success} from "@companieshouse/api-sdk-node/dist/services/result";
import {ApiErrorResponse} from "@companieshouse/api-sdk-node/dist/services/resource";
import {OrderDetailsResults} from "../../src/orderdetails/OrderDetailsResults";
import { OrderDetailsParameters } from "../../src/orderdetails/OrderDetailsParameters";
import { Status } from "../../src/core/Status";
import { Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { OrderDetails } from "../../src/orderdetails/OrderDetails";

describe("OrderDetailsService", () => {
    it("Fetches and transforms orders from the search API", async () => {
        // given
        const checkoutResponse = new Success<ApiResponse<Checkout>, ApiErrorResponse>({
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
                            forename: "John",
                            surname: "Test",
                            certificateType: "incorporation-with-all-name-changes",
                            directorDetails: {
                                includeBasicInformation: true
                            },
                            includeCompanyObjectsInformation: true,
                            includeGoodStandingInformation: true,
                            registeredOfficeAddressDetails: {
                                includeAddressRecordsType: "current"
                            },
                            secretaryDetails: {
                                includeBasicInformation: true
                            }
                        },
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
                status: "failed",
                links: {
                    self: "/basket/checkouts/ORD-957216-028332",
                    payment: "/basket/checkouts/ORD-957216-028332/payment"
                }
            }
        });
        
        const checkout: any = {};
        checkout.getCheckout = jest.fn(() => {
            return checkoutResponse;
        });
        const apiClientFactory: any = {};
        apiClientFactory.newApiClient = jest.fn(() => {
            return {
                checkout: checkout
            };
        });
        const mappedResults: OrderDetailsResults = {
            status: Status.SUCCESS,
            model: {
                orderNumber: "ORD-957216-028332"
            } as OrderDetails
        }
        const resultsMapper: any = {};
        resultsMapper.map = jest.fn(() => {
            return mappedResults;
        });
        const service = new OrderDetailsService(apiClientFactory, resultsMapper);

        // when
        const result = await service.fetchOrder(new OrderDetailsParameters("ORD-957216-028332", "F00DFACE"));

        // then
        expect(result).toBe(mappedResults);
        expect(apiClientFactory.newApiClient).toHaveBeenCalled();
        expect(checkout.getCheckout).toHaveBeenCalledWith("ORD-957216-028332");
        expect(resultsMapper.map).toHaveBeenCalledWith(checkoutResponse);
    });
});
