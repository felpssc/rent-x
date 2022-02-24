import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/Controller";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

      await createCategoryUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { CreateCategoryController };
