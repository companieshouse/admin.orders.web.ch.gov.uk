#!/usr/bin/env node
import { AuthorisationMiddleware } from "../security/AuthorisationMiddleware";
import { FakeAuthenticationMiddleware } from "../security/FakeAuthenticationMiddleware";
import { App } from "../App"
import { HelloController } from "../hello/HelloController";
import { Container } from "inversify";
import { Bindable } from "application/Bindable";
import { TYPES } from "../types";

// Get port from environment
const port = parseInt(process.env.PORT || '3000', 10)

if (isNaN(port)) {
    throw Error('Port number not provided by environment')
}

const app = new App(port, [new FakeAuthenticationMiddleware(), new AuthorisationMiddleware()])

// new HelloController(app)

const myContainer = new Container()
myContainer.bind<Bindable>(TYPES.Bindable).toConstantValue(app).whenTargetNamed("app")
myContainer.bind<HelloController>(HelloController).toSelf()
myContainer.get<HelloController>(HelloController)

app.start()
