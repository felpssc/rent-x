import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const createCarSpecification = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

routes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
routes.get("/available", listAvailableCars.handle);
routes.post(
  "/:car_id/specifications",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecification.handle
);
routes.post(
  "/:car_id/images",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export { routes as carsRoutes };
