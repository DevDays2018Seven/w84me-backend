import * as e from "express";
import { controller, httpGet, httpPost, requestBody, response } from "inversify-express-utils";
import { inject } from "inversify";
import { isNullOrUndefined, isNull } from "util";

import TYPES from "../constant/types";
import { IdGenerator } from "../services/id-generator-service";
import { SessionStore } from "../services/session-store-service";
import { Session } from "../models/session";
import { LocationStore } from "../services/location-store-service";

@controller("/sessions", TYPES.LoggerMiddleware)
export class SessionsController {

    @inject(TYPES.IdGenerator) private idGenerator: IdGenerator;
    @inject(TYPES.SessionStore) private sessionStore: SessionStore;
    @inject(TYPES.LocationStore) private locationsStore: LocationStore;

    @httpGet("/")
    private getSessions(
        @response() res: e.Response
    ): void {
        const sessions = this.sessionStore.getAllSessions().map((session: Session) => {
            return session;
        });

        res.status(200).json(sessions);
    }

    @httpPost("/")
    private reportSession(
        @requestBody() body,
        @response() res: e.Response
    ): void {
        console.log("SessionId", body.sessionId);
        console.log("LocationId", body.locationId);
        console.log("timestamp", body.timestamp);

        const sessionId = body.sessionId;
        const locationId = body.locationId;
        const timestamp = body.timestamp;

        if (isNullOrUndefined(locationId) || isNullOrUndefined(timestamp)) {
            res.status(400).end();
            return;
        }

        if (isNullOrUndefined(this.locationsStore.findLocation(locationId))) {
            res.status(400).end();
            return;
        }

        if (isNullOrUndefined(sessionId)) {
            console.log("New Session");
            const newSessionId = this.idGenerator.generateSessionId();
            const session = new Session(newSessionId, locationId, timestamp);

            this.sessionStore.addSession(session);

            res.status(201).json({ sessionId: newSessionId });
        } else {
            console.log("Session updated");

            const session = this.sessionStore.findSession(sessionId);
            if (isNullOrUndefined(session)) {
                res.status(404).end();
            } else {
                if (isNull(session.timestampEnd)) {
                    session.timestampEnd = timestamp;
                    console.log("Session closed");
                } else {
                    console.log("Session already closed");
                }

                res.status(200).json({ sessionId: sessionId });
            }
        }
    }

    @httpPost("/seed")
    private seedSessions(
        @response() res: e.Response
    ): void {
        this.sessionStore.seedSessions();
        res.status(204).end();
    }

}
