#!/usr/bin/env node
import { AuthorisationMiddleware } from "../security/AuthorisationMiddleware";
import { FakeAuthenticationMiddleware } from "../security/FakeAuthenticationMiddleware";
import { App } from "../App"
import { HelloController } from "../hello/HelloController";
import { Container } from "inversify";
import { Bindable } from "application/Bindable";
import { TYPES } from "../types";
import { Configuration } from "../config/Configuration";

// new HelloController(app)

const myContainer = new Container()
myContainer.bind<Bindable>(TYPES.Bindable).toConstantValue(app)
myContainer.bind<HelloController>(HelloController).toSelf()
myContainer.bind<Configuration>(Configuration).toSelf()
myContainer.get<Configuration>(Configuration)

app.start()
