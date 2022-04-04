import { App } from "app";
import { NextFunction, Request, Response } from "express";
import { ControllerHandler } from "./ControllerHandler";

export class AuthorisationInterceptor implements ControllerHandler {
	handler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		console.log("Authorisation interceptor handler called")
		return next()
		// TODO
	}
}