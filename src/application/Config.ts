import { Service } from "typedi";
import { NunjucksConfigurator } from "./NunjucksConfigurator";
import { StaticAssetsConfigurator } from "./StaticAssetsConfigurator";
import { ExpressConfigurator } from "./ExpressConfigurator";
import { PortConfig } from "./PortConfig";

@Service()
export class Config {
    public readonly expressConfigurators: ExpressConfigurator[];

    constructor(public readonly portConfig: PortConfig,
                private nunjucksConfigurator: NunjucksConfigurator,
                private staticAssetsConfigurator: StaticAssetsConfigurator) {
        this.expressConfigurators = [ nunjucksConfigurator, staticAssetsConfigurator ];
    }
}