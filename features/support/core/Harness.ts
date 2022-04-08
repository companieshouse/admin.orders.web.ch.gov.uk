import {AfterAll, BeforeAll} from '@cucumber/cucumber';
import {SeleniumBrowserAgent} from "./SeleniumBrowserAgent";
import {Registrar} from "../../../dist/application/Registrar";
import {Container} from "typedi";

BeforeAll(async function () {
    const registrar = Container.get(Registrar);
    registrar.start();
    await Container.get(SeleniumBrowserAgent).start(`http://localhost:${registrar.getPortNumber()}`);
});

AfterAll(async function () {
    await Container.get(SeleniumBrowserAgent).stop();
    Container.get(Registrar).stop();
});
