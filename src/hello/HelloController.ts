import { NextFunction, Request, Response } from "express";

export class HelloController {
    public async render(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Hello")
        res.render('index', { title: 'Express' });
    }
}
