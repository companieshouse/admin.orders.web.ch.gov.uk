import { NextFunction, Request, Response } from "express";
import { injectable, inject, named } from "inversify";
import { Bindable } from "application/Bindable";
import { TYPES } from "../types";

@injectable()
export class HelloController {
    constructor(@inject(TYPES.Bindable) @named("app") private readonly app: Bindable) {
        console.log("Hello constructed")
        app.bindGet('/', this.render)
    }

    public async render(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Hello")
        res.render('index', { title: 'Express' });
    }
}