import { OtherCompanyTypesCertificateMapper } from "../../src/orderitemsummary/OtherCompanyTypesCertificateMapper";
import {
    mockActiveLtdCertificateItemView,
    mockAdministratedLtdCertificateItemView,
    mockCertificateItem,
    mockDissolvedCertificateItem,
    mockDissolvedLtdCertificateItemView,
    mockLiquidatedLtdCertificateItemView,
    ORDER_ID
} from "../__mocks__/mocks";

describe("OtherCompanyTypesCertificateMapper", () => {
    describe("map", () => {
        it("Maps a certificate item for an active limited company to a view model", () => {
            // given
            const mapper = new OtherCompanyTypesCertificateMapper({
                orderId: ORDER_ID,
                item: {
                    ...mockCertificateItem,
                    itemOptions: {
                        ...mockCertificateItem.itemOptions,
                        companyStatus: "active"
                    }
                }
            });

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockActiveLtdCertificateItemView);
        });

        it("Maps a certificate item for an administrated limited company to a view model", () => {
            // given
            const mapper = new OtherCompanyTypesCertificateMapper({
                orderId: ORDER_ID,
                item: {
                    ...mockCertificateItem,
                    itemOptions: {
                        ...mockCertificateItem.itemOptions,
                        companyStatus: "administration",
                        administratorsDetails: {
                        }
                    }
                }
            });

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockAdministratedLtdCertificateItemView);
        });

        it("Maps a certificate item for a liquidated limited company to a view model", () => {
            // given
            const mapper = new OtherCompanyTypesCertificateMapper({
                orderId: ORDER_ID,
                item: {
                    ...mockCertificateItem,
                    itemOptions: {
                        ...mockCertificateItem.itemOptions,
                        companyStatus: "liquidation",
                        liquidatorsDetails: {
                            includeBasicInformation: true
                        }
                    }
                }
            });

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockLiquidatedLtdCertificateItemView);
        });

        it("Maps a certificate item for a dissolved limited company to a view model", () => {
            // given
            const mapper = new OtherCompanyTypesCertificateMapper({
                orderId: ORDER_ID,
                item: mockDissolvedCertificateItem
            });

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockDissolvedLtdCertificateItemView);
        });
    });
});
