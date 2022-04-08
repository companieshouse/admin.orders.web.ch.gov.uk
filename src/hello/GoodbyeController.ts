import { NextFunction, Request, Response } from "express";
import {Service} from "typedi";

@Service()
export class GoodbyeController {
    public async render(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Goodbye");
        res.render('hello/goodbye', { title: 'Express' });
    }
}
