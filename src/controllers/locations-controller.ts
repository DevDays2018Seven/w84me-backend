import * as e from "express";
import { controller, httpGet, response } from "inversify-express-utils";
import { inject } from "inversify";

import { IdGenerator } from "../services/id-generator-service";
import { LocationStore } from "../services/location-store-service";
import TYPES from "../constant/types";

@controller("/locations", TYPES.LoggerMiddleware)
export class LocationsController {

    @inject(TYPES.IdGenerator) private idGenerator: IdGenerator;
    @inject(TYPES.LocationStore) private locationStore: LocationStore;

    @httpGet("/")
    private getLocations(
        @response() res: e.Response,
    ): void {
        res.status(200).json(this.locationStore.getAllLocations());
    }

}
