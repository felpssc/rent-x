import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const createCarController = new CreateCarController();

routes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

export { routes as carsRoutes };
