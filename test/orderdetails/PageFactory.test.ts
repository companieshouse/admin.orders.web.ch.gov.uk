import { GlobalPageFactory } from "../../src/core/GlobalPageFactory";
import { Status } from "../../src/core/Status";
import { ViewModel } from "../../src/core/ViewModel";
import { OrderDetails } from "../../src/orderdetails/OrderDetails";
import { OrderDetailsResults } from "../../src/orderdetails/OrderDetailsResults";
import { PageFactory } from "../../src/orderdetails/PageFactory";

describe("PageFactory", () => {
    it("Builds the order details page", () => {
        // given
        const pageFactory = new PageFactory(new GlobalPageFactory());
        const orderDetails: OrderDetails = {
            orderNumber: "ORD-957216-028332",
            certificateDetails: {
                orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                companyName: "TestDefault",
                companyNumber: "TT000056",
                certificateType: "Incorporation with all company name changes",
                statementOfGoodStanding: "Yes",
                registeredOfficeAddress: "Current address",
                designatedMembers: "Including designated members':<br><br>Appointment date<br>",
            },
            deliveryInfo: {
                deliveryMethod: "Standard delivery (aim to dispatch within 10 working days)",
                deliveryDetails: "John Test<br>1 Crown Way<br>Maindy<br>Cardiff<br>Cardiff<br>CF14 3UZ<br>UK<br>",
            },
            paymentDetails: {
                paymentReference: "somereference",
                fee: "£15"
            }
        };

        const searchResults: OrderDetailsResults = {
            status: Status.SUCCESS,
            model: orderDetails
        };

        // when
        const actual = pageFactory.buildOrderDetailsPage(searchResults);

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("order_details_component.njk", [], {
                orderedBy: "testautomation5@companieshouse.gov.uk; forename=Test; surname=User",
                companyName: "TestDefault",
                companyNumber: "TT000056",
                certificateType: "Incorporation with all company name changes",
                statementOfGoodStanding: "Yes",
                registeredOfficeAddress: "Current address",
                designatedMembers: "Including designated members':<br><br>Appointment date<br>",
            }),
            new ViewModel("delivery_details_component.njk", [], {
                deliveryMethod: "Standard delivery (aim to dispatch within 10 working days)",
                deliveryDetails: "John Test<br>1 Crown Way<br>Maindy<br>Cardiff<br>Cardiff<br>CF14 3UZ<br>UK<br>",
            }),
            new ViewModel("payment_details_component.njk", [], {
                paymentReference: "somereference",
                fee: "£15"
            }),
        ],{
           title : "ORD-957216-028332"
        }));
    });

    it("Builds a service unavailable page", () => {
        // given
        const pageFactory = new PageFactory(new GlobalPageFactory());

        // when
        const actual = pageFactory.buildServiceUnavailable();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("service_unavailable.njk", [])
        ], {
            title: "Service unavailable"
        }));
    });

    it("Builds an unauthorised page", () => {
        // given
        const pageFactory = new PageFactory(new GlobalPageFactory());

        // when
        const actual = pageFactory.buildUnauthorised();

        // then
        expect(actual).toEqual(new ViewModel("page", [
            new ViewModel("unauthorised.njk", [])
        ], {
            title: "Unauthorised"
        }));
    });
});
