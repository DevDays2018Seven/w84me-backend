export class Session {

    constructor(
        private _id: number,
        private _locationId: number,
        private _timestampStart: number,
        private _timestampEnd: number = null
    ) {}

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get locationId(): number {
        return this._locationId;
    }

    set locationId(value: number) {
        this._locationId = value;
    }

    get timestampStart(): number {
        return this._timestampStart;
    }

    set timestampStart(value: number) {
        this._timestampStart = value;
    }

    get timestampEnd(): number {
        return this._timestampEnd;
    }

    set timestampEnd(value: number) {
        this._timestampEnd = value;
    }

    public toJson(): any {
        return {
            id: this.id,
            locationId: this.locationId,
            timestampStart: this.timestampStart,
            timeStampEnd: this.timestampEnd
        }
    }

    public static fromJson(json: any): Session {
        return new Session(
            json.id,
            json.locationId,
            json.timestampStart,
            json.timestampEnd
        );
    }

}
