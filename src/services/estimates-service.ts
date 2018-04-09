import { injectable, inject } from "inversify";

import { Estimation } from "../models/estimation";
import { readFileSync } from "fs";
import { SessionStore } from "./session-store-service";
import TYPES from "../constant/types";

@injectable()
export class EstimatesService {

    @inject(TYPES.SessionStore) private sessionStore: SessionStore;

    public calculateEstimates(locationId: number): Estimation {
        const sessions = this.sessionStore.getAllSessions();
        let totalWaitingTime = 0;
        let finishedSessions = 0;
        let currentTotalWaitingTime = 0;
        let openSessions = 0;

        for (const session of sessions) {
            if (session.locationId !== locationId) {
                continue;
            }

            if (session.timestampEnd === null) {
                openSessions++;
                currentTotalWaitingTime += Date.now() - session.timestampStart;
            } else {
                const dateStart = new Date(session.timestampStart);
                const dateEnd = new Date(session.timestampEnd);
                const dateNow = new Date();

                if (dateNow.getDay() == dateStart.getDay() &&
                    dateNow.getHours() >= dateStart.getHours() &&
                    dateNow.getHours() <= dateEnd.getHours()) {
                    finishedSessions++;
                    totalWaitingTime += session.timestampEnd - session.timestampStart;
                }
            }
        }

        return new Estimation(
            totalWaitingTime / finishedSessions,
            currentTotalWaitingTime / openSessions,
            openSessions
        );
    }
}
