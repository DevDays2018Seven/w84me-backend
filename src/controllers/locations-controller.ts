import * as e from "express";
import { controller, httpGet, queryParam, response } from "inversify-express-utils";
import { inject } from "inversify";
import { isNull } from "util";

import TYPES from "../constant/types";
import { IdGenerator } from "../services/id-generator-service";
import { LocationStore } from "../services/location-store-service";
import { Location } from "../models/location";

@controller("/locations", TYPES.LoggerMiddleware)
export class LocationsController {

    @inject(TYPES.IdGenerator) private idGenerator: IdGenerator;
    @inject(TYPES.LocationStore) private locationStore: LocationStore;

    @httpGet("/")
    private getLocations(
        @queryParam("latitude") latitude: string,
        @queryParam("longitude") longitude: string,
        @queryParam("distance") distance: string,
        @response() res: e.Response
    ): void {
        const latitudeNumber = latitude ? Number(latitude) : null;
        const longitudeNumber = longitude ? Number(longitude) : null;
        const distanceNumber = distance ? Number(distance) : null;

        let locations: Array<Location>;

        if (isNull(latitudeNumber) || isNull(longitudeNumber) || isNull(distanceNumber)) {
            locations = this.locationStore.getAllLocations();
        } else {
            locations = this.locationStore.getLocationsByCoordinates(
                latitudeNumber,
                longitudeNumber,
                distanceNumber
            );
        }

        res.status(200).json(locations);
    }

}
