import { NextFunction, Request, Response } from "express";

export interface ControllerHandler {
    handler(req: Request, res: Response, next: NextFunction): Promise<void>
}