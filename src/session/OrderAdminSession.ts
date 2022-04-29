import {SessionModel} from "./SessionModel";

declare global {
    namespace Express {
        interface Request {
            orderAdminSession?: SessionModel;
        }
    }
}
