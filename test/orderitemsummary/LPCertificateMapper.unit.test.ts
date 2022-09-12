import { LPCertificateMapper } from "../../src/orderitemsummary/LPCertificateMapper";
import { mockActiveLPCertificateItemView, mockCertificateItem, ORDER_ID } from "../__mocks__/mocks";

describe("LPCertificateMapper", () => {
    describe("map", () => {
       it("Maps an active limited partnership", () => {
           // given
           const mapper = new LPCertificateMapper({
               orderId: ORDER_ID,
               item: {
                   ...mockCertificateItem,
                   itemOptions: {
                       ...mockCertificateItem.itemOptions,
                       companyType: "limited-partnership",
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
               }
           });

           // when
           mapper.map();
           const actual = mapper.getMappedOrder();

           // then
           expect(actual).toEqual(mockActiveLPCertificateItemView);
       });
    });
});
