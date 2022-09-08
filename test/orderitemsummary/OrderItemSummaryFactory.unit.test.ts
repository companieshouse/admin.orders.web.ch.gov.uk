import { OrderItemMapper } from "../../src/orderitemsummary/OrderItemMapper";
import { OrderItemSummaryFactory } from "../../src/orderitemsummary/OrderItemSummaryFactory";
import { Item } from "@companieshouse/api-sdk-node/dist/services/order/order/types";
import { MissingImageDeliveryMapper } from "../../src/orderitemsummary/MissingImageDeliveryMapper";
import { NullOrderItemMapper } from "../../src/orderitemsummary/NullOrderItemMapper";
import { MapperRequest } from "../../src/mappers/MapperRequest";
import { CertifiedCopyMapper } from "../../src/orderitemsummary/CertifiedCopyMapper";
import { mockCertifiedCopyItem, mockMissingImageDeliveryItem, mockCertificateItem} from "../__mocks__/mocks";
import { OtherCompanyTypesCertificateMapper } from "../../src/orderitemsummary/OtherCompanyTypesCertificateMapper";
import { LLPCertificateMapper } from "../../src/orderitemsummary/LLPCertificateMapper";
import { LPCertificateMapper } from "../../src/orderitemsummary/LPCertificateMapper";

describe("OrderItemSummaryFactory", () => {
    describe("getMapper", () => {
        it("Returns a missing image delivery mapper for missing image delivery item kind", async () => {
            // given
            const factory = new OrderItemSummaryFactory();
            // when
            const mapper: OrderItemMapper = factory.getMapper(new MapperRequest("ORD-123123-123123", mockMissingImageDeliveryItem));
            // then
            expect(mapper).toBeInstanceOf(MissingImageDeliveryMapper);
        });

        it("Returns a certified copy mapper for certified copy item kind", async () => {
            // given
            const factory = new OrderItemSummaryFactory();
            // when
            const mapper: OrderItemMapper = factory.getMapper(new MapperRequest("ORD-123123-123123", mockCertifiedCopyItem));
            // then
            expect(mapper).toBeInstanceOf(CertifiedCopyMapper);
        });

        it("Returns a certificate mapper for other company types", async () => {
            // given
            const factory = new OrderItemSummaryFactory();
            // when
            const mapper: OrderItemMapper = factory.getMapper(new MapperRequest("ORD-123123-123123", mockCertificateItem));
            // then
            expect(mapper).toBeInstanceOf(OtherCompanyTypesCertificateMapper);
        });

        it("Returns an LLP certificate mapper for certificate item kind for LLP company", async () => {
            // given
            const factory = new OrderItemSummaryFactory();
            // when
            const mapper: OrderItemMapper = factory.getMapper(new MapperRequest("ORD-123123-123123", {
                ...mockCertificateItem,
                itemOptions: {...mockCertificateItem.itemOptions, companyType: "llp"}
            }));
            // then
            expect(mapper).toBeInstanceOf(LLPCertificateMapper);
        });

        it("Returns a limited partnership certificate mapper for certificate item kind for limited partnership company", async () => {
            // given
            const factory = new OrderItemSummaryFactory();
            // when
            const mapper: OrderItemMapper = factory.getMapper(new MapperRequest("ORD-123123-123123", {
                ...mockCertificateItem,
                itemOptions: {...mockCertificateItem.itemOptions, companyType: "limited-partnership"}
            }));
            // then
            expect(mapper).toBeInstanceOf(LPCertificateMapper);
        });

        it("Returns a null item mapper for unknown item kind", async () => {
            // given
            const factory = new OrderItemSummaryFactory();
            const unknownCert: Item = {
                ...mockMissingImageDeliveryItem,
                kind: "unknown"
            };
            // when
            const mapper: OrderItemMapper = factory.getMapper(new MapperRequest("ORD-123123-123123", unknownCert));
            // then
            expect(mapper).toBeInstanceOf(NullOrderItemMapper);
        });
    });
});
