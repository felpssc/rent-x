import { IController } from "core/Controller/Controller";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car_id as string,
      specifications_id,
    });

    return response.json(carSpecifications);
  }
}

export { CreateCarSpecificationController };
