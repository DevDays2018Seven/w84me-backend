import { injectable, inject } from "inversify";

import TYPES from "../constant/types";
import { Session } from "../models/session";
import { IdGenerator } from "./id-generator-service";

@injectable()
export class SessionStore {

    @inject(TYPES.IdGenerator) private idGenerator: IdGenerator;
    private readonly sessions: Array<Session>;

    public constructor() {
        this.sessions = [];
    }

    public seedSessions(): void {
        let generatedSessionId = this.idGenerator.generateSessionId();

        // seed finished Sessions
        for (let i = 1; i < 1000; i++) {
            const locationId = 1; // Math.floor(Math.random() * 10) + 1;
            const sessionStart = this.randomDate(new Date(2018, 2, 1), new Date(2018, 3, 1)).getTime();
            const sessionEnd = sessionStart + Math.floor(Math.random() * 3600000);


            this.addSession(new Session(generatedSessionId, locationId, sessionStart, sessionEnd));
            generatedSessionId = this.idGenerator.generateSessionId();
        }

        // seed open Sessions
        const today = new Date();

        for (let i = 1; i < 10; i++) {
            const locationId = Math.floor(Math.random() * 10) + 1;
            const sessionStart = this.randomDate(today, today).getTime() - + Math.floor(Math.random() * 3600000);

            this.addSession(new Session(generatedSessionId, locationId, sessionStart));
            generatedSessionId = this.idGenerator.generateSessionId();
        }        

        console.log(this.sessions);
    }

    private randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    public addSession(session: Session): void {
        this.sessions.push(session);
    }

    public getAllSessions(): Array<Session> {
        return this.sessions;
    }

    public findSession(id: number): Session {
        return this.sessions.find((value: Session): boolean => {
            return value.id === id;
        });
    }

}
