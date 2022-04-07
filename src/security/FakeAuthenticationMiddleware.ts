import { Middlewareable } from "../application/Middlewareable"
import { NextFunction, Request, Response } from "express"
import { Service } from "typedi"
import "reflect-metadata"

@Service()
export class FakeAuthenticationMiddleware implements Middlewareable {
    public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Fake session middleware handler called")
        return next()
    }
}