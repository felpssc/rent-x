import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();

routes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
routes.get("/available", listAvailableCars.handle);

export { routes as carsRoutes };
