import { NextFunction, Request, Response } from "express"
import { Service } from "typedi"
import "reflect-metadata"

@Service()
export class HelloController {
    public async render(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("Hello")
        res.render("hello/index", { title: "Express" })
    }
}
