import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/createSpecificationController";

const routes = Router();

const createSpecificationController = new CreateSpecificationController();

routes.use(ensureAuthenticated);

routes.post("/", createSpecificationController.handle);

export { routes as specificationRoutes };
