import { Router } from "express";

import { CreateSpecificationController } from "../../../../../modules/cars/useCases/createSpecification/createSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const createSpecificationController = new CreateSpecificationController();

routes.use(ensureAuthenticated);

routes.post("/", createSpecificationController.handle);

export { routes as specificationRoutes };
