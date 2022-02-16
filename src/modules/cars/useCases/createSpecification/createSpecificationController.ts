import { Request, Response } from "express";

import { IController } from "../../../../core/Controller/Controller";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController implements IController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      this.createSpecificationUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { CreateSpecificationController };
