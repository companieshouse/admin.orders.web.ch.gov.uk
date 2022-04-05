import { App } from "../App";
import { NextFunction, Request, Response } from "express";

export class HelloController {
    constructor(private readonly app: App) {
        app.bindGet('/', this.render)
    }

    public async render(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Hello")
        res.render('index', { title: 'Express' });
    }
}