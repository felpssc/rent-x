import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/Controller";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

      const categories = await listCategoriesUseCase.execute();

      return response.status(200).json(categories);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { ListCategoriesController };
