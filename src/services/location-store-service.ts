import { injectable } from "inversify";

import { Location } from "../models/location";
import { readFileSync } from "fs";

@injectable()
export class LocationStore {

    private readonly locations: Array<Location>;

    public constructor() {
        this.locations = this.readLocationsFromStaticFile("locations.json");
        this.locations.sort(this.sortLocationsByName);
    }

    public readLocationsFromStaticFile(path: string): Array<Location> {
        const locations = JSON.parse(readFileSync(path).toString());
        const locationArray = new Array<Location>();

        for (let location of locations) {
            locationArray.push(Location.fromJson(location));
        }

        return locationArray;
    }

    private sortLocationsByName(a: Location, b: Location): number {
        if (a.name === b.name) {
            return 0;
        }

        return a.name > b.name ? 1 : -1;
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
