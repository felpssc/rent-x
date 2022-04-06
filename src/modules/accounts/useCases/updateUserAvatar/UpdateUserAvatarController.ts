import { Request, Response } from "express";
import { container } from "tsyringe";

import { IController } from "../../../../core/Controller/Controller";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      avatar_file,
      userId: id,
    });

    return response.status(204).json();
  }
}

export { UpdateUserAvatarController };
