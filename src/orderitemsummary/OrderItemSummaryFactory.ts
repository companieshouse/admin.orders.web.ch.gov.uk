import { OrderItemMapper } from "./OrderItemMapper";
import { MapperRequest } from "../mappers/MapperRequest";
import { MissingImageDeliveryMapper } from "./MissingImageDeliveryMapper";
import { NullOrderItemMapper } from "./NullOrderItemMapper";
import { ItemOptions as CertificateItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certificates";
import {Service} from "typedi";
import "reflect-metadata";
import { CertifiedCopyMapper } from "./CertifiedCopyMapper";
import { OtherCompanyTypesCertificateMapper } from "./OtherCompanyTypesCertificateMapper";
import {LPCertificateMapper} from "./LPCertificateMapper";
import {LLPCertificateMapper} from "./LLPCertificateMapper";
import { CompanyType } from "./CompanyType";
import {FilingHistoryMapper} from "../mappers/FilingHistoryMapper";
import {Item} from "../../../api-sdk-node/dist/services/order/order";

@Service()
export class OrderItemSummaryFactory {

    constructor(private filingHistoryMapper: FilingHistoryMapper) {
    }

    getMapper (mapperRequest: MapperRequest): OrderItemMapper {
        const item: Item = mapperRequest.checkout.items[0];
        if (item.kind === "item#certificate") {
            const itemOptions = item.itemOptions as CertificateItemOptions;
            if (itemOptions.companyType === CompanyType.LIMITED_LIABILITY_PARTNERSHIP) {
                return new LLPCertificateMapper(mapperRequest);
            } else if (itemOptions.companyType === CompanyType.LIMITED_PARTNERSHIP) {
                return new LPCertificateMapper(mapperRequest);
            } else {
                return new OtherCompanyTypesCertificateMapper(mapperRequest);
            }
        } else if (item.kind === "item#missing-image-delivery") {
            return new MissingImageDeliveryMapper(mapperRequest, this.filingHistoryMapper);
        } else if (item.kind === "item#certified-copy") {
            return new CertifiedCopyMapper(mapperRequest, this.filingHistoryMapper);
        } else {
            return new NullOrderItemMapper();
        }
    }
}
