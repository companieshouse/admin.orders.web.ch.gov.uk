import { Express } from "express";

export interface ExpressConfigurator {
    configure(express: Express): void;
}