import { AbstractCertificateMapper } from "./AbstractCertificateMapper";
import { ItemOptions as CertificateItemOptions } from "@companieshouse/api-sdk-node/dist/services/order/certificates/types";
import { CompanyStatus } from "../orderdetails/CompanyStatus";
import { MapperRequest } from "../mappers/MapperRequest";
import {CertificateTextMapper} from "../orderdetails/CertificateTextMapper";

export class LLPCertificateMapper extends AbstractCertificateMapper {

    constructor (mapperRequest: MapperRequest) {
        super(mapperRequest);
    }

    protected mapCertificateDetails (): void {
        const itemOptions = this.mapperRequest.checkout.items[0].itemOptions as CertificateItemOptions;
        this.addField("Certificate type", CertificateTextMapper.mapCertificateType(itemOptions.certificateType) || "");
        if (itemOptions.certificateType === "dissolution") {
            return;
        }
        if (itemOptions.companyStatus === CompanyStatus.ACTIVE) {
            this.addField("Statement of good standing", CertificateTextMapper.isOptionSelected(itemOptions.includeGoodStandingInformation));
        }
        this.addField("Registered office address", CertificateTextMapper.mapAddressOption(itemOptions.registeredOfficeAddressDetails?.includeAddressRecordsType));
        this.addField("The names of all current designated members", CertificateTextMapper.mapMembersOptions("Including designated members':", itemOptions.designatedMemberDetails));
        this.addField("The names of all current members", CertificateTextMapper.mapMembersOptions("Including members':", itemOptions.memberDetails));
        if (itemOptions.companyStatus === CompanyStatus.ADMINISTRATION) {
            this.addField("Administrators' details", CertificateTextMapper.isOptionSelected(itemOptions.administratorsDetails?.includeBasicInformation));
        }
        if (itemOptions.companyStatus === CompanyStatus.LIQUIDATION) {
            this.addField("Liquidators' details", CertificateTextMapper.isOptionSelected(itemOptions.liquidatorsDetails?.includeBasicInformation));
        }
    }
}
