import * as e from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { injectable } from "inversify";

@injectable()
export class LoggerMiddleware extends BaseMiddleware {

    handler(req: e.Request, res: e.Response, next: e.NextFunction): void {
        console.info(req.method, req.url, req.body);
        next();
    }

}