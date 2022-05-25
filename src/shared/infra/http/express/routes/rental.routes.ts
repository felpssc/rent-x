import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListUserRentalsController } from "@modules/rentals/useCases/listUserRentals/ListUserRentalsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listUserRentalsController = new ListUserRentalsController();

routes.post("/", ensureAuthenticated, createRentalController.handle);

routes.post(
  "/:rental_id/devolution",
  ensureAuthenticated,
  devolutionRentalController.handle
);

routes.get("/user", ensureAuthenticated, listUserRentalsController.handle);

export { routes as rentalRoutes };
