import sinon from "sinon";
import proxyquire from "proxyquire";
import { Request, Response, NextFunction } from "express";

// Function to return the stubbed WebSecurity module
export const getAppWithMockedCsrf = (sandbox: sinon.SinonSandbox) => {
    // Stub the CsrfProtectionMiddleware
    const stubbedWebSecurity = {
        CsrfProtectionMiddleware: sandbox.stub().callsFake((csrfOptions) => {
            // Return a no-op middleware
            return (req: Request, res: Response, next: NextFunction) => {
                next();
            };
        })
    };

    // Return the app with the stubbed WebSecurity module using proxyquire
    return proxyquire("../../src/application/Application.ts", {
        "@companieshouse/web-security-node": stubbedWebSecurity
    }).default;
};