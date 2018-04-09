export class Location {

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public address: string,
        public latitude: number,
        public longitude: number
    ) {}

    public static fromJson(json: any): Location {
        return new Location(
            json.id,
            json.name,
            json.description,
            json.address,
            json.latitude,
            json.longitude
        );
    }

}
