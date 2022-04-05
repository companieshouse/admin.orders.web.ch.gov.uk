import { NextFunction, Request, Response } from "express";

export interface Middlewareable {
    handler(req: Request, res: Response, next: NextFunction): Promise<void>
}