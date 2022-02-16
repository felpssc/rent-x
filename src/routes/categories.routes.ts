import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory/index";
import { listCategoriesController } from "../modules/cars/useCases/listCategories/index";

const routes = Router();

routes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

routes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { routes as categoriesRoutes };
