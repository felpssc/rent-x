import { Router } from "express";
import multer from "multer";

import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

import uploadConfig from "../../../../../config/upload";
import { CreateUserController } from "../../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

routes.post("/", createUserController.handle);

routes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

routes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { routes as usersRoutes };
