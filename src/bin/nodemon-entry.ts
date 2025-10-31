import { PortConfig } from "../application/PortConfig";
import { ServerPaths } from "../application/ServerPaths";
import { NunjucksConfigurator } from "../application/NunjucksConfigurator";
import { StaticAssetsConfigurator } from "../application/StaticAssetsConfigurator";
import { Config } from "../application/Config";
import { Application } from "../application/Application";

/* All extra set up for nodemon config, as this service doesn't follow typical arctitecture suggested in chs-dev docs
nodemon set up */
const serverPaths = new ServerPaths();
const nunjucksConfigurator = new NunjucksConfigurator(serverPaths);
const staticAssetsConfigurator = new StaticAssetsConfigurator(serverPaths);
const portConfig = new PortConfig();

const config = new Config(portConfig, nunjucksConfigurator, staticAssetsConfigurator);
const appInstance = new Application(config);
const app = appInstance.getExpressApp();

const PORT = config.portConfig.port;
app.set("port", PORT);

app.listen(PORT, () => {
  console.log(`✅  Application Ready. Running on port ${PORT}`);
});