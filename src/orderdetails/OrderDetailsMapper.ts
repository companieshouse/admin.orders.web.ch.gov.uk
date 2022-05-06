import { DeliveryDetails } from "@companieshouse/api-sdk-node/dist/services/order/basket/types";
import { MemberDetails } from "@companieshouse/api-sdk-node/dist/services/order/certificates/types";
import { CertificateItemOptions, Checkout, DirectorOrSecretaryDetails } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { ApiResult, ApiResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { createLogger } from "@companieshouse/structured-logging-node";
import { Status } from "core/Status";
import { Service } from "typedi";
import { AddressRecordsType } from "./AddressRecordsType";
import { OrderDetails } from "./OrderDetails";
import { OrderDetailsResults } from "./OrderDetailsResults";

@Service()
export class OrderDetailsMapper {

    private static readonly logger = createLogger("SearchResultsMapper");

    map(response: ApiResult<ApiResponse<Checkout>>): OrderDetailsResults {
        if (response.isSuccess()) {
            let item = response.value.resource?.items[0]
            let itemOptions = item?.itemOptions as CertificateItemOptions
            return {
                status: Status.SUCCESS,
                model: {
                    orderNumber: response.value.resource?.reference,
                    certificateDetails: {
                        orderedBy: response.value.resource?.checkedOutBy.email,
                        companyName: item?.companyName,
                        companyNumber: item?.companyNumber,
                        certificateType: this.mapCertificateType(itemOptions.certificateType),
                        statementOfGoodStanding: this.isOptionSelected(itemOptions.includeGoodStandingInformation),
                        registeredOfficeAddress: this.mapAddressOption(itemOptions.registeredOfficeAddressDetails?.includeAddressRecordsType),
                        principalPlaceOfBusiness: this.mapAddressOption(itemOptions.principalPlaceOfBusinessDetails?.includeAddressRecordsType),
                        directors: this.mapDirectorOptions(itemOptions.directorDetails),
                        secretaries: this.mapSecretaryOptions(itemOptions.secretaryDetails),
                        designatedMembers: this.mapMembersOptions("Including designated members':", itemOptions.designatedMemberDetails),
                        members: this.mapMembersOptions("Including members':", itemOptions.memberDetails),
                        generalPartners: this.isOptionSelected(itemOptions.generalPartnerDetails?.includeBasicInformation),
                        limitedPartners: this.isOptionSelected(itemOptions.limitedPartnerDetails?.includeBasicInformation),
                        generalNatureOfBusiness: this.isOptionSelected(itemOptions.includeGeneralNatureOfBusinessInformation),
                        companyObjects: this.isOptionSelected(itemOptions.includeCompanyObjectsInformation),
                        liquidators: this.isOptionSelected(itemOptions.liquidatorsDetails?.includeBasicInformation),
                        administrators: this.isOptionSelected(itemOptions.administratorsDetails?.includeBasicInformation),
                    },
                    deliveryInfo: {
                        deliveryMethod: this.mapDeliveryMethod(itemOptions),
                        deliveryDetails: this.mapDeliveryDetails(response.value.resource?.deliveryDetails),
                    },
                    paymentDetails: {
                        paymentReference: response.value.resource?.paymentReference,
                        fee: this.prependCurrencySymbol(response.value.resource?.totalOrderCost)
                    }
                } as OrderDetails
            } as OrderDetailsResults;
        } else {
            OrderDetailsMapper.logger.error("Checkout endpoint returned HTTP [" + response.value.httpStatusCode + "] with error(s): '" + (response.value.errors || []).map(error => error.error).join(", ") + "'");
            return {
                status: Status.SERVER_ERROR
            } as OrderDetailsResults;
        }
    }

    private isOptionSelected (itemOption?: Boolean): string | undefined {
        if (itemOption === undefined) {
            return undefined;
        } else {
            return itemOption ? "Yes" : "No";
        }
    }

    private mapCertificateType (certificateType: string): string {
        if (certificateType === "incorporation-with-all-name-changes") {
            return "Incorporation with all company name changes";
        } else if (certificateType === "dissolution") {
            return "Dissolution with all company name changes";
        }

        const typeCapitalised = certificateType.charAt(0).toUpperCase() +
            certificateType.slice(1);

        return typeCapitalised.replace(/-/g, " ");
    }

    private prependCurrencySymbol (fee?: string): string {
        return "£" + fee;
    }

    private mapAddressOption (addressOption?: string): string | undefined {
        switch (addressOption) {
        case undefined:
            return undefined;
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

    private mapDirectorOptions (directorOptions?: DirectorOrSecretaryDetails): string | undefined {
        if (directorOptions?.includeBasicInformation === undefined) {
            return undefined;
        }

        if (directorOptions.includeBasicInformation === false) {
            return "No";
        }

        if (directorOptions.includeBasicInformation &&
            !directorOptions.includeAddress &&
            !directorOptions.includeAppointmentDate &&
            !directorOptions.includeCountryOfResidence &&
            !directorOptions.includeDobType &&
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

        return this.mapToHtml(mappings);
    }

    private mapSecretaryOptions (secretaryOptions?: DirectorOrSecretaryDetails): string | undefined {
        if (secretaryOptions?.includeBasicInformation === undefined) {
            return undefined;
        }

        if (secretaryOptions?.includeBasicInformation === false) {
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

        return this.mapToHtml(secretaryMappings);
    }

    private mapMembersOptions (heading: string, memberOptions?: MemberDetails): string | undefined {
        if (memberOptions?.includeBasicInformation === undefined) {
            return undefined;
        }

        if (memberOptions?.includeBasicInformation === false) {
            return "No";
        }

        if (memberOptions.includeBasicInformation &&
            !memberOptions.includeAddress &&
            !memberOptions.includeAppointmentDate &&
            !memberOptions.includeCountryOfResidence &&
            !memberOptions.includeDobType) {
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

        return this.mapToHtml(membersMappings);
    }

    private mapDeliveryDetails (deliveryDetails?: DeliveryDetails): string {
        const mappings: string[] = [];

        if (deliveryDetails === undefined) {
            return "";
        }

        mappings.push(deliveryDetails.forename + " " + deliveryDetails.surname);
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

        return this.mapToHtml(mappings);
    }

    private mapDeliveryMethod (itemOptions?: Record<string, any>): string | null {
        if (itemOptions?.deliveryTimescale === "standard") {
            return "Standard delivery (aim to dispatch within 10 working days)";
        }
        if (itemOptions?.deliveryTimescale === "same-day") {
            return "Same Day";
        }
        return null;
    }

    private mapToHtml (mappings: string[]): string {
        let htmlString: string = "";

        mappings.forEach((element) => {
            htmlString += element + "<br>";
        });
        return htmlString;
    }

}