import { AbstractCertificateMapper } from "./AbstractCertificateMapper";
import { MapperRequest } from "../mappers/MapperRequest";
import { ItemOptions as CertificateItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certificates/types";
import {CertificateTextMapper} from "../orderdetails/CertificateTextMapper";

export class LPCertificateMapper extends AbstractCertificateMapper {

    constructor (mapperRequest: MapperRequest) {
        super(mapperRequest);
    }

    protected mapCertificateDetails (): void {
        const itemOptions = this.mapperRequest.checkout.items[0].itemOptions as CertificateItemOptions;
        this.addField("Certificate type", CertificateTextMapper.mapCertificateType(itemOptions.certificateType) || "");
        this.addField("Statement of good standing", CertificateTextMapper.isOptionSelected(itemOptions.includeGoodStandingInformation));
        this.addField("Principal place of business", CertificateTextMapper.mapAddressOption(itemOptions.principalPlaceOfBusinessDetails?.includeAddressRecordsType));
        this.addField("The names of all current general partners", CertificateTextMapper.isOptionSelected(itemOptions.generalPartnerDetails?.includeBasicInformation));
        this.addField("The names of all current limited partners", CertificateTextMapper.isOptionSelected(itemOptions.limitedPartnerDetails?.includeBasicInformation));
        this.addField("General nature of business", CertificateTextMapper.isOptionSelected(itemOptions.includeGeneralNatureOfBusinessInformation));
    }
}
