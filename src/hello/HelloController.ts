import {App} from "../app";

export class HelloController {
    constructor(private readonly app: App) {
        app.addRoute('/', this.render)
    }

    render = (req: any, res: { render: (arg0: string, arg1: { title: string; }) => void; }, next: any) => {
        res.render('index', {title: 'Express'});
    }
}