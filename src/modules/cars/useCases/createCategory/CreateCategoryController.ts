import { Request, Response } from "express";

import { IController } from "../../../../core/Controller/Controller";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController implements IController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      this.createCategoryUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { CreateCategoryController };
