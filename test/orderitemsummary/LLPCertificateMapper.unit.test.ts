import {
    mockActiveLLPCertificateItemView,
    mockAdministratedLLPCertificateItemView,
    mockCertificateItem,
    mockDissolvedCertificateItem, mockDissolvedCertificateItemView,
    mockLiquidatedLLPCertificateItemView,
    ORDER_ID
} from "../__mocks__/mocks";
import { LLPCertificateMapper } from "../../src/orderitemsummary/LLPCertificateMapper";

describe("LLPCertificateMapper", () => {
    describe("map", () => {
        it("Maps a certificate item for an active LLP to a view model", () => {
            // given
            const mapper = new LLPCertificateMapper({
                orderId: ORDER_ID,
                item: {
                    ...mockCertificateItem,
                    itemOptions: {
                        ...mockCertificateItem.itemOptions,
                        companyStatus: "active",
                        companyType: "llp",
                        designatedMemberDetails: {
                            includeBasicInformation: true,
                            includeAddress: false,
                            includeAppointmentDate: false,
                            includeCountryOfResidence: false
                        },
                        memberDetails: {
                            includeBasicInformation: true,
                            includeAddress: false,
                            includeAppointmentDate: false,
                            includeCountryOfResidence: false
                        }
                    }
                }
            });

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockActiveLLPCertificateItemView);
        });

        it("Maps a certificate item for an administrated LLP to a view model", () => {
            // given
            const mapper = new LLPCertificateMapper({
                orderId: ORDER_ID,
                item: {
                    ...mockCertificateItem,
                    itemOptions: {
                        ...mockCertificateItem.itemOptions,
                        companyStatus: "administration",
                        companyType: "llp",
                        designatedMemberDetails: {
                            includeBasicInformation: true,
                            includeAddress: true,
                            includeAppointmentDate: true,
                            includeCountryOfResidence: true,
                            includeDobType: "partial"
                        },
                        memberDetails: {
                            includeBasicInformation: true,
                            includeAddress: true,
                            includeAppointmentDate: true,
                            includeCountryOfResidence: true,
                            includeDobType: "partial"
                        },
                        administratorsDetails: {
                        }
                    }
                }
            });

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockAdministratedLLPCertificateItemView);
        });

        it("Maps a certificate item for a liquidated LLP to a view model", () => {
            // given
            const mapper = new LLPCertificateMapper({
                orderId: ORDER_ID,
                item: {
                    ...mockCertificateItem,
                    itemOptions: {
                        ...mockCertificateItem.itemOptions,
                        companyStatus: "liquidation",
                        companyType: "llp",
                        designatedMemberDetails: {
                        },
                        memberDetails: {
                        },
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
            expect(actual).toEqual(mockLiquidatedLLPCertificateItemView);
        });

        it("Maps a certificate item for a dissolved LLP to a view model", () => {
            // given
            const mapper = new LLPCertificateMapper({
                orderId: ORDER_ID,
                item: {
                    ...mockDissolvedCertificateItem,
                    itemOptions: {
                        ...mockDissolvedCertificateItem.itemOptions,
                        companyType: "llp"
                    }
                }
            });

            // when
            mapper.map();
            const actual = mapper.getMappedOrder();

            // then
            expect(actual).toEqual(mockDissolvedCertificateItemView);
        });
    });
});
