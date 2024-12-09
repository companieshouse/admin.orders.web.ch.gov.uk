process.env.COOKIE_NAME = process.env.COOKIE_NAME || "test";

import {AfterAll, Before, BeforeAll} from '@cucumber/cucumber';
import {Registrar} from "../../../dist/application/Registrar";
import {Container} from "typedi";
import {AgentService} from "./BrowserAgent";
import {FEATURE_FLAGS} from "../../../dist/config/FeatureOptions";

BeforeAll(async function () {
    const registrar = Container.get(Registrar);
    registrar.start();
    await (Container.get(process.env.agent || "selenium") as AgentService).start(`http://localhost:${registrar.getPortNumber()}`);
});

AfterAll(async function () {
    await (Container.get(process.env.agent || "selenium") as AgentService).stop();
    Container.get(Registrar).stop();
});

Before(function () {
    FEATURE_FLAGS.multiItemBasketEnabled = false;
});
