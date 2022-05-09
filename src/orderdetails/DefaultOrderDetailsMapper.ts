import { CertificateItemOptions, Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { ApiResult, ApiResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { createLogger } from "@companieshouse/structured-logging-node";
import { Status } from "core/Status";
import { CertificateTextMapper } from "./CertificateTextMapper";
import { CompanyStatus } from "./CompanyStatus";
import { OrderDetails } from "./OrderDetails";
import { OrderDetailsMapper } from "./OrderDetailsMapper";
import { OrderDetailsResults } from "./OrderDetailsResults";

export class DefaultOrderDetailsMapper implements OrderDetailsMapper {

    private static readonly logger = createLogger("DefaultOrderDetailsMapper");

    map(response: ApiResult<ApiResponse<Checkout>>): OrderDetailsResults {
        if (response.isSuccess()) {
            let item = response.value.resource?.items[0]
            let itemOptions = item?.itemOptions as CertificateItemOptions
            return {
                status: Status.SUCCESS,
                model: {
                    certificateDetails: {
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
                        filterMappings: {
                            statementOfGoodStanding: itemOptions.companyStatus === CompanyStatus.ACTIVE,
                            liquidators: itemOptions.companyStatus === CompanyStatus.LIQUIDATION,
                            administrators: itemOptions.companyStatus === CompanyStatus.ADMINISTRATION
                        }
                    },
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
}