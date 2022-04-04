import { NextFunction, Request, RequestHandler, Response } from "express";
import { MiddlewareProvider } from "./MiddlewareProvider";

export class FakeMiddlewareProvider implements MiddlewareProvider {
    sessionMiddleware(): RequestHandler {
        return this.fakeHandler
    }

    fakeHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("Fake middleware handler called")
        return next()
    }
}