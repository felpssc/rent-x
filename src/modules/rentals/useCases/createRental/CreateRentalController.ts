import { IController } from "core/Controller/Controller";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { car_id, expected_return_date } = request.body;

    console.log(user_id, car_id, expected_return_date);

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      user_id,
      car_id,
      expected_return_date,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
