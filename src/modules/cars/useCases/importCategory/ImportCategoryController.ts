import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/Controller";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
