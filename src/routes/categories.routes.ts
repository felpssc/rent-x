import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory/index";

const routes = Router();

const categoriesRepository = new CategoriesRepository();

routes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

routes.get("/", (req, res) => {
  const categories = categoriesRepository.list();

  return res.status(200).json(categories);
});

export { routes as categoriesRoutes };
