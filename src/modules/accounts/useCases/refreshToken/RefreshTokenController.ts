import { IController } from "core/Controller/Controller";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTOkenUseCase = container.resolve(RefreshTokenUseCase);

    const refreshToken = await refreshTOkenUseCase.execute(token);

    return response.json({ refreshToken });
  }
}

export { RefreshTokenController };
