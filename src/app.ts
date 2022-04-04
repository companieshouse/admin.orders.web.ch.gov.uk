import http from "http";

const createError = require('http-errors');
import express, {Express} from 'express';
import ErrnoException = NodeJS.ErrnoException;
import {Server} from "net";
import {Router} from "express/ts4.0";

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

type HandlerFunction = (req: any, res: { render: (arg0: string, arg1: { title: string; }) => void; }, next: any) => void

export class App {
    public app: Express;
    private server: Server;
    private router: Router;

    constructor(private readonly port: number) {
        this.router = express.Router();

        this.app = express();

        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'jade');

        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use('/', this.router);

        // catch 404 and forward to error handler
        this.app.use(function (req: any, res: any, next: (arg0: any) => void) {
            next(createError(404));
        });

        // error handler
        this.app.use(function (err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') !== 'development' ? {} : err;

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

        /**
         * Event listener for HTTP server "error" event.
         */

        // Port
        this.app.set('port', this.port);

        /**
         * Create HTTP server.
         */
        this.server = http.createServer(this.app);
    }

    start = () => {
        /**
         * Listen on provided port, on all network interfaces.
         */
        this.server.listen(this.port);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
    }

    onError = (error: ErrnoException) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error('Port ' + this.port + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error('Port ' + this.port + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */
    onListening = () => {
        console.debug('Listening on port ' + this.port);
    }

    addRoute = (path: string, handlerFunction: HandlerFunction) => {
        this.router.get(path, handlerFunction);
    }
}