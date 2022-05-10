import { CertificateItemOptions, Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { ApiResult, ApiResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { createLogger } from "@companieshouse/structured-logging-node";
import { Status } from "core/Status";
import { CertificateTextMapper } from "./CertificateTextMapper";
import { CompanyStatus } from "./CompanyStatus";
import { OrderDetails, CertificateDetails } from "./OrderDetails";
import { OrderDetailsMapper } from "./OrderDetailsMapper";
import { OrderDetailsResults } from "./OrderDetailsResults";
import { isString } from "util";

export class DefaultOrderDetailsMapper implements OrderDetailsMapper {

    private static readonly logger = createLogger("DefaultOrderDetailsMapper");

    map(response: ApiResult<ApiResponse<Checkout>>): OrderDetailsResults {
        if (response.isSuccess()) {

            let item = response.value.resource?.items[0]
            let itemOptions = item?.itemOptions as CertificateItemOptions
            let certificateDetails = {
                orderNumber: response.value.resource?.reference,
                orderedBy: response.value.resource?.checkedOutBy.email,
                companyName: item?.companyName,
                companyNumber: item?.companyNumber,
                certificateType: CertificateTextMapper.mapCertificateType(itemOptions.certificateType),
                statementOfGoodStanding: CertificateTextMapper.isOptionSelected(itemOptions.includeGoodStandingInformation),
                registeredOfficeAddress: CertificateTextMapper.mapAddressOption(itemOptions.registeredOfficeAddressDetails?.includeAddressRecordsType),
                directors: CertificateTextMapper.mapDirectorOptions(itemOptions.directorDetails),
                secretaries: CertificateTextMapper.mapSecretaryOptions(itemOptions.secretaryDetails),
                companyObjects: CertificateTextMapper.isOptionSelected(itemOptions.includeCompanyObjectsInformation),
                liquidators: CertificateTextMapper.isOptionSelected(itemOptions.liquidatorsDetails?.includeBasicInformation),
                administrators: CertificateTextMapper.isOptionSelected(itemOptions.administratorsDetails?.includeBasicInformation),
                isNotDissolution: itemOptions.certificateType !== "dissolution"
            } as CertificateDetails
            
            return {
                status: Status.SUCCESS,
                model: {
                    certificateDetails: this.filterMappings(certificateDetails, itemOptions.companyStatus),
                    deliveryInfo: {
                        deliveryMethod: CertificateTextMapper.mapDeliveryMethod(itemOptions),
                        deliveryDetails: CertificateTextMapper.mapDeliveryDetails(response.value.resource?.deliveryDetails),
                    },
                    paymentDetails: {
                        paymentReference: response.value.resource?.paymentReference,
                        fee: CertificateTextMapper.prependCurrencySymbol(response.value.resource?.totalOrderCost)
                    }
                } as OrderDetails
            } as OrderDetailsResults;
        } else {
            DefaultOrderDetailsMapper.logger.error("Checkout endpoint returned HTTP [" + response.value.httpStatusCode + "] with error(s): '" + (response.value.errors || []).map(error => error.error).join(", ") + "'");
            return {
                status: Status.SERVER_ERROR
            } as OrderDetailsResults;
        }
    }

    filterMappings(details: CertificateDetails, companyStatus: string): CertificateDetails {
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