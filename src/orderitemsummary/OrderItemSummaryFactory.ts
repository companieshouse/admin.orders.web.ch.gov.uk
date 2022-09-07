import { OrderItemMapper } from "./OrderItemMapper";
import { MapperRequest } from "../mappers/MapperRequest";
import { MissingImageDeliveryMapper } from "./MissingImageDeliveryMapper";
import { NullOrderItemMapper } from "./NullOrderItemMapper";
import { CertifiedCopyMapper } from "./CertifiedCopyMapper";

export class OrderItemSummaryFactory {
    getMapper (mapperRequest: MapperRequest): OrderItemMapper {
        if (mapperRequest.item.kind === "item#missing-image-delivery") {
            return new MissingImageDeliveryMapper(mapperRequest);
        } else if (mapperRequest.item.kind === "item#certified-copy") {
            return new CertifiedCopyMapper(mapperRequest);
        } else {
            return new NullOrderItemMapper();
        }
    }
}
