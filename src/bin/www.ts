#!/usr/bin/env node
import {AuthorisationInterceptor} from "../security/AuthorisationInterceptor";
import {FakeMiddlewareProvider} from "../security/FakeMiddlewareProvider";
import {App} from "../app"
import {HelloController} from "../hello/HelloController";

// Get port from environment
const port = parseInt(process.env.PORT || '3000', 10)

if (isNaN(port)) {
    throw Error('Port number not provided by environment')
}

const app = new App(port,
    new FakeMiddlewareProvider(),
    [new AuthorisationInterceptor()])

new HelloController(app)

app.start()
