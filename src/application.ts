import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";

import { IdGenerator } from "./services/id-generator-service";
import { LocationStore } from "./services/location-store-service";

import { LoggerMiddleware } from "./middleware/logger-middleware";
import TYPES from "./constant/types";

// Controllers
import "./controllers/locations-controller";
import "./controllers/sessions-controller"
import { SessionStore } from "./services/session-store-service";
import { EstimatesService } from "./services/estimates-service";

// InversifyJS Container
const container = new Container();

// Services
container.bind<IdGenerator>(TYPES.IdGenerator).to(IdGenerator).inSingletonScope();
container.bind<LocationStore>(TYPES.LocationStore).to(LocationStore).inSingletonScope();
container.bind<SessionStore>(TYPES.SessionStore).to(SessionStore).inSingletonScope();
container.bind<EstimatesService>(TYPES.EstimatesService).to(EstimatesService).inSingletonScope();

// Middleware
container.bind<LoggerMiddleware>(TYPES.LoggerMiddleware).to(LoggerMiddleware);

// Server
const server = new InversifyExpressServer(container, null, { rootPath: "/api/v1" });

// Configuration
server.setConfig((application) => {
    application.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        next();
    });
    application.options("/*", (request, response, next) => {
        response.status(200).end();
    });
    application.use(bodyParser.urlencoded({ extended: true }));
    application.use(bodyParser.json());
});

// Application
const application = server.build();
application.listen(3000);
