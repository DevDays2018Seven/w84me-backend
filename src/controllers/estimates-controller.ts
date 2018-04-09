import * as e from "express";
import { controller, httpGet, response, requestBody } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from "../constant/types";
import { EstimatesService } from "../services/estimates-service";

@controller("/estimates", TYPES.LoggerMiddleware)
export class EstimatesController {

    @inject(TYPES.EstimatesService) private estimatesService: EstimatesService;

    @httpGet("/")
    private getEstimates(
        @requestBody("locationId") locationId: number,
        @response() res: e.Response
    ): void {
        res.status(200).json(this.estimatesService.calculateEstimates(locationId));
    }

}
