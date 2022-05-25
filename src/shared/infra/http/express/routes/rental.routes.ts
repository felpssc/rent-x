import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

routes.post("/", ensureAuthenticated, createRentalController.handle);
routes.post(
  "/:rental_id/devolution",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { routes as rentalRoutes };
