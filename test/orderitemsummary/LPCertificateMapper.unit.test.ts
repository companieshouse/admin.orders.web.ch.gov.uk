import { LPCertificateMapper } from "../../src/orderitemsummary/LPCertificateMapper";
import {
    mockActiveLPCertificateItemView,
    mockCertificateItem,
    mockCheckoutNoItems,
    ORDER_ID
} from "../__mocks__/mocks";

describe("LPCertificateMapper", () => {
    describe("map", () => {
       it("Maps an active limited partnership", () => {
           // given
           const mockItem = {
               ...mockCertificateItem,
               itemOptions: {
                   ...mockCertificateItem.itemOptions,
                   companyType: "limited-partnership",
                   quantity: "1",
                   principalPlaceOfBusinessDetails: {
                       includeAddressRecordsType: "current-and-previous"
                   },
                   limitedPartnerDetails: {
                       includeBasicInformation: true
                   },
                   generalPartnerDetails: {
                       includeBasicInformation: true
                   },
                   includeGeneralNatureOfBusinessInformation: true
               }
           };

           const mapper = new LPCertificateMapper({
               orderId: ORDER_ID,
               checkout: {...mockCheckoutNoItems, items: [mockItem]}
           });

           // when
           mapper.map();
           const actual = mapper.getMappedOrder();

           // then
           expect(actual).toEqual(mockActiveLPCertificateItemView);
       });
    });
});
