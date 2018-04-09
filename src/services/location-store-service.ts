import { injectable } from "inversify";
import { readFileSync } from "fs";

import { Location } from "../models/location";

@injectable()
export class LocationStore {

    private readonly locations: Array<Location>;

    public constructor() {
        this.locations = this.readLocationsFromStaticFile("locations.json");
        this.locations.sort(this.sortLocationsByName);
    }

    public addLocation(location: Location): void {
        this.locations.push(location);
    }

    public getAllLocations(): Array<Location> {
        return this.locations;
    }

    public getLocationsByCoordinates(
        latitude: number,
        longitude: number,
        distance: number
    ): Array<Location> {
        return this.locations.filter((location: Location): Boolean => {
            const d = this.getSphericalDistance(
                latitude,
                longitude,
                location.latitude,
                location.longitude);

            return d <= distance;
        });
    }

    public findLocation(id: number): Location {
        return this.locations.find((value: Location): boolean => {
            return value.id === id;
        });
    }

    private readLocationsFromStaticFile(path: string): Array<Location> {
        const locations = JSON.parse(readFileSync(path).toString());
        const locationArray: Array<Location> = [];

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

    private getSphericalDistance(
        latitude1: number,
        longitude1: number,
        latitude2: number,
        longitude2: number,
        radius: number = 6378173
    ): number {
        const lat1 = latitude1 * Math.PI / 180;
        const long1 = longitude1 * Math.PI / 180;
        const lat2 = latitude2 * Math.PI / 180;
        const long2 = longitude2 * Math.PI / 180;

        const dLat = (lat2 - lat1) * 0.5;
        const dLong = (long2 - long1) * 0.5;

        const x = Math.pow(Math.sin(dLat), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLong), 2);

        return 2 * radius * Math.asin(Math.sqrt(x));
    }

}
