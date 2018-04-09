import * as e from "express";
import { controller, httpGet, response } from "inversify-express-utils";
import { inject } from "inversify";

import { IdGenerator } from "../services/id-generator-service";
import TYPES from "../constant/types";
import { SessionStore } from "../services/session-store-service";

@controller("/sessions", TYPES.LoggerMiddleware)
export class SessionsController {

    @inject(TYPES.IdGenerator) private idGenerator: IdGenerator;
    @inject(TYPES.SessionStore) private sessionStore: SessionStore;

    @httpGet("/")
    private getSessions(
        @response() res: e.Response,
    ): void {
        res.status(200).json(this.sessionStore.getAllSessions());
    }

}
