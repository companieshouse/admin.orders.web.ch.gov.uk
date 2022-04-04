import {App} from "../app";
import {NextFunction, Request} from "express";
import {Response} from "express";

export class HelloController {
    constructor(private readonly app: App) {
        app.addRoute('/', this.render)
    }

    render = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.render('index', {title: 'Express'});
    }
}