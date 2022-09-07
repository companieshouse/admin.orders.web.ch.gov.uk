import {
    DirectorOrSecretaryDetails,
    MemberDetails
} from "@companieshouse/api-sdk-node/dist/services/order/certificates/types";
import { DeliveryDetails } from "@companieshouse/api-sdk-node/dist/services/order/basket/types";
import { AddressRecordsType } from "./AddressRecordsType";
import { CompanyStatus } from "./CompanyStatus";
import { CertificateDetails } from "./OrderDetails";

export abstract class CertificateTextMapper {
    static readonly DISSOLUTION = "dissolution";
    static readonly ITEM_KIND_CERTIFICATE = "item#certificate";

    static isOptionSelected (itemOption: Boolean | undefined): string {
        if (itemOption === undefined) {
            return "No";
        } else {
            return "Yes";
        }
    }

    static mapCertificateType (certificateType: string): string {
        if (certificateType === "incorporation-with-all-name-changes") {
            return "Incorporation with all company name changes";
        } else if (certificateType === "dissolution") {
            return "Dissolution with all company name changes";
        }

        const typeCapitalised = certificateType.charAt(0).toUpperCase() +
            certificateType.slice(1);

        return typeCapitalised.replace(/-/g, " ");
    }

    static prependCurrencySymbol (fee?: string): string {
        return "£" + fee;
    }

    static mapAddressOption (addressOption: string | undefined): string {
        switch (addressOption) {
        case AddressRecordsType.CURRENT:
            return "Current address";
        case AddressRecordsType.CURRENT_AND_PREVIOUS:
            return "Current address and the one previous";
        case AddressRecordsType.CURRENT_PREVIOUS_AND_PRIOR:
            return "Current address and the two previous";
        case AddressRecordsType.ALL:
            return "All current and previous addresses";
        default:
            return "No";
        }
    }

    static mapDirectorOptions (directorOptions?: DirectorOrSecretaryDetails): string {
        if (directorOptions === undefined || directorOptions.includeBasicInformation === undefined) {
            return "No";
        }

        if (directorOptions.includeBasicInformation &&
            !directorOptions.includeAddress &&
            !directorOptions.includeAppointmentDate &&
            !directorOptions.includeCountryOfResidence &&
            directorOptions.includeDobType === undefined &&
            !directorOptions.includeNationality &&
            !directorOptions.includeOccupation) {
            return "Yes";
        }

        const mappings: string[] = [];
        mappings.push("Including directors':");
        mappings.push("");

        if (directorOptions.includeAddress) {
            mappings.push("Correspondence address");
        }

        if (directorOptions.includeOccupation) {
            mappings.push("Occupation");
        }

        if (directorOptions.includeDobType === "partial" ||
            directorOptions.includeDobType === "full") {
            mappings.push("Date of birth (month and year)");
        }

        if (directorOptions.includeAppointmentDate) {
            mappings.push("Appointment date");
        }

        if (directorOptions.includeNationality) {
            mappings.push("Nationality");
        }

        if (directorOptions.includeCountryOfResidence) {
            mappings.push("Country of residence");
        }

        return CertificateTextMapper.mapToHtml(mappings);
    }

    static mapSecretaryOptions (secretaryOptions?: DirectorOrSecretaryDetails): string {
        if (secretaryOptions === undefined || secretaryOptions.includeBasicInformation === undefined) {
            return "No";
        }

        if (secretaryOptions.includeBasicInformation &&
            !secretaryOptions.includeAddress &&
            !secretaryOptions.includeAppointmentDate) {
            return "Yes";
        }

        const secretaryMappings: string[] = [];
        secretaryMappings.push("Including secretaries':");
        secretaryMappings.push("");

        if (secretaryOptions.includeAddress) {
            secretaryMappings.push("Correspondence address");
        }

        if (secretaryOptions.includeAppointmentDate) {
            secretaryMappings.push("Appointment date");
        }

        return CertificateTextMapper.mapToHtml(secretaryMappings);
    }

    static mapMembersOptions (heading: string, memberOptions?: MemberDetails): string {
        if (memberOptions === undefined || memberOptions.includeBasicInformation === undefined) {
            return "No";
        }

        if (memberOptions.includeBasicInformation &&
            !memberOptions.includeAddress &&
            !memberOptions.includeAppointmentDate &&
            !memberOptions.includeCountryOfResidence &&
            memberOptions.includeDobType === undefined) {
            return "Yes";
        }

        const membersMappings: string[] = [];
        membersMappings.push(heading);
        membersMappings.push("");

        if (memberOptions.includeAddress) {
            membersMappings.push("Correspondence address");
        }

        if (memberOptions.includeAppointmentDate) {
            membersMappings.push("Appointment date");
        }

        if (memberOptions.includeCountryOfResidence) {
            membersMappings.push("Country of residence");
        }

        if (memberOptions.includeDobType === "partial" ||
            memberOptions.includeDobType === "full") {
            membersMappings.push("Date of birth (month and year)");
        }

        return CertificateTextMapper.mapToHtml(membersMappings);
    }

    static mapDeliveryDetails (deliveryDetails: DeliveryDetails | undefined): string {
        const mappings: string[] = [];

        if (deliveryDetails === undefined) {
            return "";
        }

        mappings.push(deliveryDetails.forename + " " + deliveryDetails.surname);

        if (deliveryDetails.companyName !== "" && deliveryDetails.companyName !== undefined) {
            mappings.push(deliveryDetails.companyName);
        }

        mappings.push(deliveryDetails.addressLine1);

        if (deliveryDetails.addressLine2 !== "" && deliveryDetails.addressLine2 !== undefined) {
            mappings.push(deliveryDetails.addressLine2);
        }

        mappings.push(deliveryDetails.locality);

        if (deliveryDetails.region !== "" && deliveryDetails.region !== undefined) {
            mappings.push(deliveryDetails.region);
        }

        if (deliveryDetails.postalCode !== "" && deliveryDetails.postalCode !== undefined) {
            mappings.push(deliveryDetails.postalCode);
        }

        mappings.push(deliveryDetails.country);

        return CertificateTextMapper.mapToHtml(mappings);
    }

    static mapDeliveryMethod (itemOptions: Record<string, any>): string | null {
        if (itemOptions?.deliveryTimescale === "standard") {
            return "Standard delivery (aim to dispatch within 10 working days)";
        }
        if (itemOptions?.deliveryTimescale === "same-day") {
            return "Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day)";
        }
        return null;
    }

    static mapEmailCopyRequired (itemOptions: Record<string, any>): string {
        if (itemOptions?.deliveryTimescale === "same-day") {
            if (itemOptions?.includeEmailCopy === true) {
                return "Yes";
            }
            if (itemOptions?.includeEmailCopy === false) {
                return "No";
            }
        }
        return "Email only available for express delivery method";
    }

    static mapToHtml (mappings: string[]): string {
        let htmlString: string = "";

        mappings.forEach((element) => {
            htmlString += element + "\n";
        });
        return htmlString;
    }

    static filterMappings(details: CertificateDetails, companyStatus: string): CertificateDetails {
        if (companyStatus === CompanyStatus.ACTIVE) {
            delete details.administrators;
            delete details.liquidators;
        } else if (companyStatus == CompanyStatus.LIQUIDATION) {
            delete details.statementOfGoodStanding;
            delete details.administrators;
        } else if (companyStatus === CompanyStatus.ADMINISTRATION) {
            delete details.statementOfGoodStanding;
            delete details.liquidators;
        } 
        return details;
    }
}
