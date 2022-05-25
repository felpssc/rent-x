import { IController } from "core/Controller/Controller";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserRentalsUseCase } from "./ListUserRentalsUseCase";

class ListUserRentalsController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase);

    const rentals = await listUserRentalsUseCase.execute(user_id);

    return response.json(rentals);
  }
}

export { ListUserRentalsController };
