import { Request, Response } from "express";

import { IController } from "../../../../core/Controller/Controller";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController implements IController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const categories = this.listCategoriesUseCase.execute();

      return response.status(200).json(categories);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { ListCategoriesController };
