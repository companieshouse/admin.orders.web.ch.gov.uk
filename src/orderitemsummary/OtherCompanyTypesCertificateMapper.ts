import { AbstractCertificateMapper } from "./AbstractCertificateMapper";
import { MapperRequest } from "../mappers/MapperRequest";
import { ItemOptions as CertificateItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certificates";
import {CertificateTextMapper} from "../orderdetails/CertificateTextMapper";
import {CompanyStatus} from "../orderdetails/CompanyStatus";

export class OtherCompanyTypesCertificateMapper extends AbstractCertificateMapper {
    constructor (mapperRequest: MapperRequest) {
        super(mapperRequest);
    }

    mapCertificateDetails (): void {
        const itemOptions = this.mapperRequest.checkout.items[0].itemOptions as CertificateItemOptions;
        this.addField("Certificate type", CertificateTextMapper.mapCertificateType(itemOptions.certificateType) || "");
        if (itemOptions.certificateType === "dissolution") {
            return;
        }
        if (itemOptions.companyStatus === CompanyStatus.ACTIVE) {
            this.addField("Statement of good standing", CertificateTextMapper.isOptionSelected(itemOptions.includeGoodStandingInformation));
        }
        this.addField("Registered office address", CertificateTextMapper.mapAddressOption(itemOptions.registeredOfficeAddressDetails?.includeAddressRecordsType));
        this.addField("The names of all current company directors", CertificateTextMapper.mapDirectorOptions(itemOptions.directorDetails));
        this.addField("The names of all current secretaries", CertificateTextMapper.mapSecretaryOptions(itemOptions.secretaryDetails));
        this.addField("Company objects", CertificateTextMapper.isOptionSelected(itemOptions.includeCompanyObjectsInformation));
        if (itemOptions.companyStatus === CompanyStatus.ADMINISTRATION) {
            this.addField("Administrators' details", CertificateTextMapper.isOptionSelected(itemOptions.administratorsDetails?.includeBasicInformation));
        }
        if (itemOptions.companyStatus === CompanyStatus.LIQUIDATION) {
            this.addField("Liquidators' details", CertificateTextMapper.isOptionSelected(itemOptions.liquidatorsDetails?.includeBasicInformation));
        }
    }
}
