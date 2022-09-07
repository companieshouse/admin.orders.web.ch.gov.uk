import { OrderItemMapper } from "./OrderItemMapper";
import { MapperRequest } from "../mappers/MapperRequest";
import { MissingImageDeliveryMapper } from "./MissingImageDeliveryMapper";
import { NullOrderItemMapper } from "./NullOrderItemMapper";

export class OrderItemSummaryFactory {
    getMapper (mapperRequest: MapperRequest): OrderItemMapper {
        if (mapperRequest.item.kind === "item#missing-image-delivery") {
            return new MissingImageDeliveryMapper(mapperRequest);
        } else {
            return new NullOrderItemMapper();
        }
    }
}