import { IController } from "core/Controller/Controller";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const { rental_id } = request.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      user_id,
      rental_id,
    });

    return response.json(rental);
  }
}

export { DevolutionRentalController };
