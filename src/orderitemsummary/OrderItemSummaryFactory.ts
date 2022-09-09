import { OrderItemMapper } from "./OrderItemMapper";
import { MapperRequest } from "../mappers/MapperRequest";
import { MissingImageDeliveryMapper } from "./MissingImageDeliveryMapper";
import { NullOrderItemMapper } from "./NullOrderItemMapper";
import { ItemOptions as CertificateItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certificates";
import {Service} from "typedi";
import "reflect-metadata";
import { OtherCompanyTypesCertificateMapper } from "./OtherCompanyTypesCertificateMapper";
import {LPCertificateMapper} from "./LPCertificateMapper";
import {LLPCertificateMapper} from "./LLPCertificateMapper";
import {CompanyType} from "./CompanyType";
import {FilingHistoryMapper} from "../mappers/FilingHistoryMapper";

@Service()
export class OrderItemSummaryFactory {

    constructor(private filingHistoryMapper: FilingHistoryMapper) {
    }

    getMapper (mapperRequest: MapperRequest): OrderItemMapper {
        if (mapperRequest.item.kind === "item#certificate") {
            const itemOptions = mapperRequest.item.itemOptions as CertificateItemOptions;
            if (itemOptions.companyType === CompanyType.LIMITED_LIABILITY_PARTNERSHIP) {
                return new LLPCertificateMapper(mapperRequest);
            } else if (itemOptions.companyType === CompanyType.LIMITED_PARTNERSHIP) {
                return new LPCertificateMapper(mapperRequest);
            } else {
                return new OtherCompanyTypesCertificateMapper(mapperRequest);
            }
        } else if (mapperRequest.item.kind === "item#missing-image-delivery") {
            return new MissingImageDeliveryMapper(mapperRequest, this.filingHistoryMapper);
        } else {
            return new NullOrderItemMapper();
        }
    }
}
