export class Location {

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public address: string,
        public latitude: string,
        public longitude: string
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
