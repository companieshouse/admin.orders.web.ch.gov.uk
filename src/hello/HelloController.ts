import { App } from "../app";
import { NextFunction, Request, Response } from "express";

export class HelloController {
    constructor(private readonly app: App) {
        app.bindGet('/', this.render)
    }

    render = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("Hello")
        res.render('index', { title: 'Express' });
    }
}