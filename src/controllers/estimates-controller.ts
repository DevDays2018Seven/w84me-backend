import * as e from "express";
import { controller, httpGet, response, requestBody } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from "../constant/types";
import { EstimatesService } from "../services/estimates-service";
import { LocationStore } from "../services/location-store-service";
import { isNullOrUndefined } from "util";

@controller("/estimates", TYPES.LoggerMiddleware)
export class EstimatesController {

    @inject(TYPES.LocationStore) private locationStore: LocationStore;
    @inject(TYPES.EstimatesService) private estimatesService: EstimatesService;

    @httpGet("/")
    private getEstimates(
        @requestBody("locationId") locationId: number,
        @response() res: e.Response
    ): void {
        if (isNullOrUndefined(this.locationStore.findLocation(locationId))) {
            res.status(400).end();
            return;
        }

        res.status(200).json(this.estimatesService.calculateEstimates(locationId));
    }

}
