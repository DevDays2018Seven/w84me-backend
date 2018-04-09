import { injectable } from "inversify";

import { Location } from "../models/location";

@injectable()
export class LocationStore {

    private readonly locations: Array<Location>;

    public constructor() {
        this.locations = [];
    }

    public addLocation(location: Location): void {
        this.locations.push(location);
    }

    public getAllLocations(): Array<Location> {
        return this.locations;
    }

    public findLocation(id: number): Location {
        return this.locations.find((value: Location): boolean => {
            return value.id === id;
        });
    }

}
