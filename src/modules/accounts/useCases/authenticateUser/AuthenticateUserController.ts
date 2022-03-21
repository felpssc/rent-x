import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/Controller";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({ email, password });

    return response.json(token);
  }
}

export { AuthenticateUserController };
