import { injectable } from "inversify";

@injectable()
export class IdGenerator {

    private nextLocationId: number;
    private nextSessionnId: number;

    public constructor() {
        this.nextLocationId = 0;
        this.nextSessionnId = 0;
    }

    public generateLocationId(): number {
        return this.nextLocationId++;
    }

    public generateSessionId(): number {
        return this.nextSessionnId++;
    }

}
