import { CertificateItemOptions, Checkout } from "@companieshouse/api-sdk-node/dist/services/order/checkout/types";
import { ApiResponse, ApiErrorResponse } from "@companieshouse/api-sdk-node/dist/services/resource";
import { Status } from "core/Status";
import { CertificateTextMapper } from "./CertificateTextMapper";
import { CertificateDetails, OrderDetails } from "./OrderDetails";
import { OrderDetailsResults } from "./OrderDetailsResults";
import e = require("express");
import { Success } from "@companieshouse/api-sdk-node/dist/services/result";
import { AbstractOrderDetailsMapper } from "./AbstractOrderDetailsMapper";

export class LLPOrderDetailsMapper extends AbstractOrderDetailsMapper {
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
            designatedMembers: CertificateTextMapper.mapMembersOptions("Including designated members':", itemOptions.designatedMemberDetails),
            members: CertificateTextMapper.mapMembersOptions("Including members':", itemOptions.memberDetails),
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
                },
                paymentDetails: {
                    paymentReference: response.value.resource?.paymentReference,
                    fee: CertificateTextMapper.prependCurrencySymbol(response.value.resource?.totalOrderCost)
                }
            } as OrderDetails
        } as OrderDetailsResults;
    } 
}