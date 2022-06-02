import { Router } from "express";

import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

import { AuthenticateUserController } from "../../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const routes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

routes.post("/sessions", authenticateUserController.handle);
routes.post("/refresh-token", refreshTokenController.handle);

export { routes as authRoutes };
