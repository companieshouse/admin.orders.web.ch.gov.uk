import nunjucks from "nunjucks";
import http from "http";
import express, { Express, NextFunction, Request, Response, Router } from "express";
import { Middlewareable } from "application/Middlewareable";
import { Service } from "typedi";
import "reflect-metadata";
import path from "path";
import { Config } from "./Config";

const createError = require("http-errors");
import ErrnoException = NodeJS.ErrnoException;

const cookieParser = require("cookie-parser");

type HandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
type Process = () => void

@Service()
export class Application {
    private readonly app: Express;
    private readonly router: Router;
    private readonly routerBindings: Process[] = [];

    constructor(private readonly config: Config) {
        this.router = Router();

        this.app = express();

        // Port
        this.app.set("port", this.config.port());

        this.app.engine("njk", nunjucks.render);
        this.app.set("view engine", "njk");
    }

    public start() : void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser())
        this.app.use(express.static(path.join(__dirname, '../public')))
console.log("static path:" + path.join(__dirname, '../public'))

        // where nunjucks templates should resolve to
        const viewPath = path.join(__dirname, "../views");
        console.log("view path:" + path.join(__dirname, "../views"));

        // set up the template engine
        nunjucks.configure([
            viewPath,
            path.join(__dirname, "../../node_modules/govuk-frontend/")
        ], {
            autoescape: true,
            express: this.app
        });
        console.log("nunjucks path:" + path.join(__dirname, "../../../node_modules/govuk-frontend/"))

        this.app.use("/", this.router);

        // catch 404 and forward to error handler
        this.app.use(function (req: any, res: any, next: (arg0: any) => void) {
            next(createError(404));
        });

        // error handler
        this.app.use(function (err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") !== "development" ? {} : err;

            // render the error page
            res.status(err.status || 500);
            res.render("error");
        });

        // Late binding to router middleware must occur after application middleware binding
        this.routerBindings.forEach(routerBinding => routerBinding());

        // Create HTTP server.
        const server = http.createServer(this.app);

        // Listen on provided port, on all network interfaces.
        server.listen(this.config.port());
        server.on("error", this.onError.bind(this));
        server.on("listening", this.onListening.bind(this));
    }

    // Bind uriPath GET to handlerFunction
    public bindGet(uriPath: string, handlerFunction: HandlerFunction, applicationMiddlewareables: Middlewareable[]): void {
        // Bind path to application middleware
        for (let applicationMiddlewareable of applicationMiddlewareables) {
            this.app.get(uriPath, applicationMiddlewareable.handler);
        }

        // NB: router middleware must be bound last after all application middleware; i.e. in start() above.
        this.routerBindings.push(() => {
            this.router.get(uriPath, handlerFunction);
        });
    }

    private onError(error: ErrnoException): void {
        if (error.syscall !== "listen") {
            throw error;
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error("Port " + this.config.port() + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error("Port " + this.config.port() + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    // Event listener for HTTP server "listening" event.
    private onListening(): void {
        console.debug("Listening on port " + this.config.port());
    }
}
