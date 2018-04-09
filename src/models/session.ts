export class Session {

    constructor(
        private _id: number,
        private _locationId: number,
        private _timestampStart: number,
        private _timestampEnd: number
    ) {}



    // public toJson(): any {
    //     return {
    //         id: this.id,
    //         locationId: this.locationId,
    //         timestampStart: this.timestampStart,
    //         timeStampEnd: this.timestampEnd
    //     }
    // }

    // public static fromJson(json: any): Session {
    //     return new Location(
    //         json.id,
    //         json.locationId,
    //         json.timestampStart,
    //         json.timestampEnd
    //     );
    // }

}
