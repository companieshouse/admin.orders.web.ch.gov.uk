import { Bindable } from "../application/Bindable";
import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class HelloController {
    constructor() {
        console.log("Hello constructed")
    }

    public async render(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Hello")
        res.render('index', { title: 'Express' });
    }

    configure(app: Bindable) {
        app.bindGet('/', this.render)
    }
}