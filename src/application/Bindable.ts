import { NextFunction, Request, Response } from "express";

export interface Bindable {
    bindGet(uriPath: string, handlerFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>): void
}