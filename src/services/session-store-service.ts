import { injectable } from "inversify";

import { Session } from "../models/session";

@injectable()
export class SessionStore {

    private readonly sessions: Array<Session>;

    public constructor() {
        this.sessions = [];
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
