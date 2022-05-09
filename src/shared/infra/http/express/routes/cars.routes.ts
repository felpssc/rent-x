import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificationController();

routes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
routes.get("/available", listAvailableCars.handle);
routes.post(
  "/:car_id/specifications",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecification.handle
);

export { routes as carsRoutes };
