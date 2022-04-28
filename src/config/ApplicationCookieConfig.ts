import {Service} from "typedi";
import "reflect-metadata";
import {CookieConfig} from "@companieshouse/node-session-handler";

@Service("cookieConfig")
export class ApplicationCookieConfig implements CookieConfig {
    constructor(public cookieName: string = process.env.COOKIE_NAME || "",
        public cookieDomain: string = process.env.COOKIE_DOMAIN || "",
        public cookieSecureFlag: boolean = (process.env.COOKIE_SECURE_ONLY === "true"),
        public cookieTimeToLiveInSeconds: number = parseInt(process.env.DEFAULT_SESSION_EXPIRATION || "3600") || 3600,
        public cookieSecret: string = process.env.COOKIE_SECRET || "") {
    }
}
