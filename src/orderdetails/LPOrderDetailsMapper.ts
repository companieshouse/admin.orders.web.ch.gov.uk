import { CertificateItemOptions, Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { ApiResult, ApiResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { createLogger } from "@companieshouse/structured-logging-node";
import { Status } from "core/Status";
import { Inject, Service } from "typedi";
import { CertificateTextMapper } from "./CertificateTextMapper";
import { OrderDetails } from "./OrderDetails";
import { OrderDetailsMapper } from "./OrderDetailsMapper";
import { OrderDetailsResults } from "./OrderDetailsResults";

@Service()
export class LPOrderDetailsMapper implements OrderDetailsMapper {

    private static readonly logger = createLogger("LPOrderDetailsMapper");
    
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
                        principalPlaceOfBusiness: CertificateTextMapper.mapAddressOption(itemOptions.principalPlaceOfBusinessDetails?.includeAddressRecordsType),
                        generalPartners: CertificateTextMapper.isOptionSelected(itemOptions.generalPartnerDetails?.includeBasicInformation),
                        limitedPartners: CertificateTextMapper.isOptionSelected(itemOptions.limitedPartnerDetails?.includeBasicInformation),
                        generalNatureOfBusiness: CertificateTextMapper.isOptionSelected(itemOptions.includeGeneralNatureOfBusinessInformation),
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
            LPOrderDetailsMapper.logger.error("Checkout endpoint returned HTTP [" + response.value.httpStatusCode + "] with error(s): '" + (response.value.errors || []).map(error => error.error).join(", ") + "'");
            return {
                status: Status.SERVER_ERROR
            } as OrderDetailsResults;
        }
    }
}