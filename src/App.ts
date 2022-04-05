import http from "http"
import express, { Express, NextFunction, Request, Response, Router } from "express"
import { Middlewareable } from "application/Middlewareable"

import path from "path"

const createError = require('http-errors')
import ErrnoException = NodeJS.ErrnoException;

const cookieParser = require('cookie-parser')

type HandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
type Process = () => void

export class App {
    private readonly app: Express
    private readonly router: Router
    private readonly routerBindings: Process[] = []

    constructor(private readonly port: number, private readonly applicationMiddlewareables: Middlewareable[]) {
        this.router = Router()

        this.app = express()

        // Port
        this.app.set('port', this.port)

        // View engine setup TODO: Nunjucks
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'jade')
    }

    start = () => {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser())
        this.app.use(express.static(path.join(__dirname, 'public')))

        this.app.use('/', this.router)

        // catch 404 and forward to error handler
        this.app.use(function (req: any, res: any, next: (arg0: any) => void) {
            next(createError(404))
        })

        // error handler
        this.app.use(function (err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }) {
            // set locals, only providing error in development
            res.locals.message = err.message
            res.locals.error = req.app.get('env') !== 'development' ? {} : err

            // render the error page
            res.status(err.status || 500)
            res.render('error')
        });

        // Late binding to router middleware must occur after application middleware binding
        this.routerBindings.forEach(routerBinding => routerBinding())

        // Create HTTP server.
        const server = http.createServer(this.app)

        // Listen on provided port, on all network interfaces.
        server.listen(this.port)
        server.on('error', this.onError)
        server.on('listening', this.onListening)
    }

    onError = (error: ErrnoException) => {
        if (error.syscall !== 'listen') {
            throw error
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error('Port ' + this.port + ' requires elevated privileges')
                process.exit(1)
                break
            case 'EADDRINUSE':
                console.error('Port ' + this.port + ' is already in use')
                process.exit(1)
                break
            default:
                throw error
        }
    }

    // Event listener for HTTP server "listening" event.
    onListening = () => {
        console.debug('Listening on port ' + this.port)
    }

    // Bind uriPath GET to handlerFunction
    bindGet = (uriPath: string, handlerFunction: HandlerFunction) => {
        // Bind path to application middleware
        for (let applicationMiddlewareable of this.applicationMiddlewareables) {
            this.app.get(uriPath, applicationMiddlewareable.handler)
        }

        // NB: router middleware must be bound last after all application middleware; i.e. in start() above.
        this.routerBindings.push(() => {
            this.router.get(uriPath, handlerFunction)
        })
    }
}