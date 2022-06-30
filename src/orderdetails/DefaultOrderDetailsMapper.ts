import { CertificateItemOptions, Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { ApiResponse, ApiErrorResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { Status } from "core/Status";
import { CertificateTextMapper } from "./CertificateTextMapper";
import { OrderDetails, CertificateDetails } from "./OrderDetails";
import { OrderDetailsResults } from "./OrderDetailsResults";
import { AbstractOrderDetailsMapper } from "./AbstractOrderDetailsMapper";
import { Success } from "@companieshouse/api-sdk-node/dist/services/result";
import {Service} from "typedi";
import "reflect-metadata";

@Service()
export class DefaultOrderDetailsMapper extends AbstractOrderDetailsMapper {
    mapSuccessfulResponse(response: Success<ApiResponse<Checkout>, ApiErrorResponse>): OrderDetailsResults {
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
            isNotDissolution: itemOptions.certificateType !== CertificateTextMapper.DISSOLUTION
        } as CertificateDetails

        return {
            status: Status.SUCCESS,
            model: {
                certificateDetails: CertificateTextMapper.filterMappings(certificateDetails, itemOptions.companyStatus),
                deliveryInfo: {
                    deliveryMethod: CertificateTextMapper.mapDeliveryMethod(itemOptions),
                    deliveryDetails: CertificateTextMapper.mapDeliveryDetails(response.value.resource?.deliveryDetails),
                    emailCopyRequired: CertificateTextMapper.mapEmailCopyRequired(itemOptions),
                },
                paymentDetails: {
                    paymentReference: response.value.resource?.paymentReference,
                    fee: CertificateTextMapper.prependCurrencySymbol(response.value.resource?.totalOrderCost)
                }
            } as OrderDetails
        } as OrderDetailsResults;
    }
}
