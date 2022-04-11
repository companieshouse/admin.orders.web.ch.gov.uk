import "reflect-metadata";
import { Service } from "typedi";
import {NextFunction, Request, Response} from "express";

@Service()
export class SearchController {

    public async render(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Search");
        res.render('search/search');
    }
}
