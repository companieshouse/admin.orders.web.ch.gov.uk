import { NextFunction, Request, Response } from "express";
import { Middlewareable } from "../application/Middlewareable";

export class AuthorisationMiddleware implements Middlewareable {
    handler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("Authorisation interceptor handler called")
        return next()
        // TODO
    }
}