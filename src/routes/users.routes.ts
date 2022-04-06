import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const routes = Router();

const upload = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

routes.post("/", createUserController.handle);

routes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { routes as usersRoutes };
