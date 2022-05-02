import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

routes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

routes.get("/", listCategoriesController.handle);

routes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle,
  ensureAuthenticated,
  ensureAdmin
);

export { routes as categoriesRoutes };
