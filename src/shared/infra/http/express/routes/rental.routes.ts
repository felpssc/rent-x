import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const createRentalController = new CreateRentalController();

routes.post("/", ensureAuthenticated, createRentalController.handle);

export { routes as rentalRoutes };
