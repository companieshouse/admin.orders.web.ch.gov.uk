import { Middlewareable } from "../application/Middlewareable";
import { NextFunction, Request, Response } from "express";

export class FakeAuthenticationMiddleware implements Middlewareable {
    handler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("Fake session middleware handler called")
        return next()
    }
}