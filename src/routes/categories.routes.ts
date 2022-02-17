import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory/index";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories/index";

const routes = Router();

const upload = multer({
  dest: "./tmp",
});

routes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

routes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

routes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { routes as categoriesRoutes };
