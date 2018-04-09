import { injectable } from "inversify";

@injectable()
export class IdGenerator {

    private nextLocationId: number;

    public constructor() {
        this.nextLocationId = 0;
    }

    public generateLocationId(): number {
        return this.nextLocationId++;
    }

}
