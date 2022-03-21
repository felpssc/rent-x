import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/CreateUserController";

const routes = Router();

const createUserController = new CreateUserController();

routes.post("/", createUserController.handle);

export { routes as usersRoutes };
