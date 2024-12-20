import http, { Server } from "http";
import express, { Express, NextFunction, Request, Response, Router } from "express";
import { Middlewareable } from "application/Middlewareable";
import { Service } from "typedi";
import { Config } from "./Config";
import actuator from 'express-actuator';
import { CsrfError } from "@companieshouse/web-security-node";

const createError = require('http-errors');
import ErrnoException = NodeJS.ErrnoException;
import { AddressInfo } from "net";

const cookieParser = require("cookie-parser");
const actuatorOptions = {
    basePath: "/orders-admin"  // Define the actuator base path
};

type HandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
type Process = () => void

@Service()
export class Application {
    private readonly express: Express = express();
    private readonly router: Router = Router();
    private readonly routerBindings: Process[] = [];
    private readonly middlewareBindings: Process[] = [];
    private readonly requestedPort: number;
    private server: Server | null = null;

    constructor(private readonly config: Config) {
        this.requestedPort = config.portConfig.port;
        this.express.set("port", this.requestedPort);
    }

    public start(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cookieParser());

        this.express.use(actuator(actuatorOptions));

        // Custom configuration e.g. template engine, static routes etc.
        this.config.expressConfigurators.forEach(configurator => configurator.configure(this.express));

        this.express.use("/", this.router);

        // catch 404 and forward to error handler
        this.express.use(function (req: any, res: any, next: (arg0: any) => void) {
            next(createError(404));
        });

        // CSRF error handler
        this.express.use(function (err: any, req: any, res: any, next: (arg0: any) => void) {
        if (err instanceof CsrfError) {
            res.status(403).render("service_unavailable");
        }
    });

        // error handler
        this.express.use(function (err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }) {        
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") !== "development" ? {} : err;

            // render the error page
            res.status(err.status || 500);
            res.render("error");
        });

        // Late binding to router middleware must occur after application middleware binding
        this.middlewareBindings.forEach(middlewareBinding => middlewareBinding());
        this.routerBindings.forEach(routerBinding => routerBinding());

        // Create HTTP server.
        this.server = http.createServer(this.express);

        // Listen on provided port, on all network interfaces.
        this.server.listen(this.requestedPort);
        this.server.on("error", this.onError.bind(this));
        this.server.on("listening", this.onListening.bind(this));
    }

    // Bind uriPath GET to handlerFunction
    public bindGet(uriPath: string, handlerFunction: HandlerFunction, applicationMiddlewareables: Middlewareable[]): void {
        // Bind path to application middleware
        for (let applicationMiddlewareable of applicationMiddlewareables) {
            this.middlewareBindings.push(() => {
                this.router.get(uriPath, applicationMiddlewareable.handler.bind(applicationMiddlewareable));
            });
        }

        this.routerBindings.push(() => {
            this.router.get(uriPath, handlerFunction);
        });
    }

    // Bind uriPath POST to handlerFunction
    public bindPost(uriPath: string, handlerFunction: HandlerFunction, applicationMiddlewareables: Middlewareable[]): void {
        // Bind path to application middleware
        for (let applicationMiddlewareable of applicationMiddlewareables) {
            this.middlewareBindings.push(() => {
                this.router.post(uriPath, applicationMiddlewareable.handler.bind(applicationMiddlewareable));
            });
        }

        // NB: router middleware must be bound last after all application middleware; i.e. in start() above.
        this.routerBindings.push(() => {
            this.router.post(uriPath, handlerFunction);
        });
    }

    public stop(): void {
        if (this.server == null) {
            console.error("Server not started");
            return;
        }
        this.server.close();
    }

    public getPort(): number {
        if (this.server == null) {
            console.error("Server not started");
            return 0;
        }
        return (this.server.address() as AddressInfo).port;
    }

    private onError(error: ErrnoException): void {
        if (error.syscall !== "listen") {
            throw error;
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error("Port " + this.requestedPort + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error("Port " + this.requestedPort + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    // Event listener for HTTP server "listening" event.
    private onListening(): void {
        console.debug("Listening on port " + (this.server?.address() as AddressInfo).port);
    }
}
