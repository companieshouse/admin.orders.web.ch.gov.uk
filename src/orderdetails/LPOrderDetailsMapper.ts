import { CertificateItemOptions, Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { ApiResponse, ApiErrorResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { Status } from "core/Status";
import { CertificateTextMapper } from "./CertificateTextMapper";
import { OrderDetails } from "./OrderDetails";
import { OrderDetailsResults } from "./OrderDetailsResults";
import { Success } from "@companieshouse/api-sdk-node/dist/services/result";
import { AbstractOrderDetailsMapper } from "./AbstractOrderDetailsMapper";

export class LPOrderDetailsMapper extends AbstractOrderDetailsMapper {
    mapSuccessfulResponse(response: Success<ApiResponse<Checkout>, ApiErrorResponse>): OrderDetailsResults {
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
                    principalPlaceOfBusiness: CertificateTextMapper.mapAddressOption(itemOptions.principalPlaceOfBusinessDetails?.includeAddressRecordsType),
                    generalPartners: CertificateTextMapper.isOptionSelected(itemOptions.generalPartnerDetails?.includeBasicInformation),
                    limitedPartners: CertificateTextMapper.isOptionSelected(itemOptions.limitedPartnerDetails?.includeBasicInformation),
                    generalNatureOfBusiness: CertificateTextMapper.isOptionSelected(itemOptions.includeGeneralNatureOfBusinessInformation),
                    isNotDissolution: itemOptions.certificateType !== CertificateTextMapper.DISSOLUTION
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
    }
}