import { Router } from "express";

import { CreateSpecificationController } from "../../../../../modules/cars/useCases/createSpecification/createSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const createSpecificationController = new CreateSpecificationController();

routes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { routes as specificationRoutes };
