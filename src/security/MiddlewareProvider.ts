import { RequestHandler } from "express";

export interface MiddlewareProvider {
    sessionMiddleware(): RequestHandler
}