export class Estimation {

    constructor(
        private _estimatedWaitingTime: number,
        private _currentAverageWaitingTime: number,
        private _openSessions
    ) {}

    get estimatedWaitingTime(): number {
        return this._estimatedWaitingTime;
    }

    set estimatedWaitingTime(value: number) {
        this._estimatedWaitingTime = value;
    }

    get currentAverageWaitingTime(): number {
        return this._currentAverageWaitingTime;
    }

    set currentAverageWaitingTime(value: number) {
        this._currentAverageWaitingTime = value;
    }

    get openSessions(): number {
        return this._openSessions;
    }

    set openSessions(value: number) {
        this._openSessions = value;
    }

    public toJson(): any {
        return {
            estimatedWaitingTime: this.estimatedWaitingTime,
            currentAverageWaitingTime: this.currentAverageWaitingTime,
            openSessions: this.openSessions
        }
    }

    public static fromJson(json: any): Estimation {
        return new Estimation(
            json.estimatedWaitingTime,
            json.currentAverageWaitingTime,
            json.openSessions
        );
    }

}
