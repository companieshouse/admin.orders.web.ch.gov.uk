import { CertificateItemOptions, Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { ApiResult, ApiResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { createLogger } from "@companieshouse/structured-logging-node";
import { Status } from "core/Status";
import { Inject, Service } from "typedi";
import { CertificateTextMapper } from "./CertificateTextMapper";
import { CompanyStatus } from "./CompanyStatus";
import { OrderDetails } from "./OrderDetails";
import { OrderDetailsMapper } from "./OrderDetailsMapper";
import { OrderDetailsResults } from "./OrderDetailsResults";

@Service()
export class LLPOrderDetailsMapper implements OrderDetailsMapper {

    private static readonly logger = createLogger("LLPOrderDetailsMapper");
    private readonly DISSOLUTION = "dissolution";

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
                designatedMembers: CertificateTextMapper.mapMembersOptions("Including designated members':", itemOptions.designatedMemberDetails),
                members: CertificateTextMapper.mapMembersOptions("Including members':", itemOptions.memberDetails),
                liquidators: CertificateTextMapper.isOptionSelected(itemOptions.liquidatorsDetails?.includeBasicInformation),
                administrators: CertificateTextMapper.isOptionSelected(itemOptions.administratorsDetails?.includeBasicInformation),
                isNotDissolution: itemOptions.certificateType !== this.DISSOLUTION
            }
            return {
                status: Status.SUCCESS,
                model: {
                    certificateDetails: CertificateTextMapper.filterMappings(certificateDetails, itemOptions.companyStatus),
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
            LLPOrderDetailsMapper.logger.error("Checkout endpoint returned HTTP [" + response.value.httpStatusCode + "] with error(s): '" + (response.value.errors || []).map(error => error.error).join(", ") + "'");
            return {
                status: Status.SERVER_ERROR
            } as OrderDetailsResults;
        }
    }
}