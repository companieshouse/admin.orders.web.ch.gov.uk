import {AfterAll, BeforeAll} from '@cucumber/cucumber';
import {Registrar} from "../../../dist/application/Registrar";
import {Container} from "typedi";
import {AgentService} from "./BrowserAgent";

BeforeAll(async function () {
    const registrar = Container.get(Registrar);
    registrar.start();
    await (Container.get(process.env.agent || "selenium") as AgentService).start(`http://localhost:${registrar.getPortNumber()}`);
});

AfterAll(async function () {
    await (Container.get(process.env.agent || "selenium") as AgentService).stop();
    Container.get(Registrar).stop();
});
