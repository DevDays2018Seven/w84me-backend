export class Estimation {

    constructor(
        public estimatedWaitingTime: number,
        public currentAverageWaitingTime: number,
        public openSessions
    ) {}

    public static fromJson(json: any): Estimation {
        return new Estimation(
            json.estimatedWaitingTime,
            json.currentAverageWaitingTime,
            json.openSessions
        );
    }

}
