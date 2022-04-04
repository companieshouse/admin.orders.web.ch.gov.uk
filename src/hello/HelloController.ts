import { App } from "../app";
import { NextFunction, Request } from "express";
import { Response } from "express";

export class HelloController {
    constructor(private readonly app: App) {
        app.addGetRoute('/', this.render)
    }

    render = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("Hello")
        res.render('index', { title: 'Express' });
    }
}