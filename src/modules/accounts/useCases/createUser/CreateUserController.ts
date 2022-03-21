import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/Controller";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license }: ICreateUserDTO =
      request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    });

    return response.json(user);
  }
}

export { CreateUserController };
