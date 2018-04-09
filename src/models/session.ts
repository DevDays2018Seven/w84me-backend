export class Session {

    constructor(
        public id: number,
        public locationId: number,
        public timestampStart: number,
        public timestampEnd: number = null
    ) {}

    public static fromJson(json: any): Session {
        return new Session(
            json.id,
            json.locationId,
            json.timestampStart,
            json.timestampEnd
        );
    }

}
