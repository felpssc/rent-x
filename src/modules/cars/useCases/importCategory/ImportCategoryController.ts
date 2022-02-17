import { Request, Response } from "express";

import { IController } from "../../../../core/Controller/Controller";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController implements IController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
