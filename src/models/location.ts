export class Location {

    constructor(
        private _id: number,
        private _name: string,
        private _description: string,
        private _address: string,
        private _latitude: string,
        private _longitude: string
    ) {}

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    get latitude(): string {
        return this._latitude;
    }

    set latitude(value: string) {
        this._latitude = value;
    }

    get longitude(): string {
        return this._longitude;
    }

    set longitude(value: string) {
        this._longitude = value;
    }

    public toJson(): any {
        return {
            id: this.id,
            name: this.name
        }
    }

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
