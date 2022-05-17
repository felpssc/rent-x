import { inject, injectable } from "tsyringe";

import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: CarImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async (image_name) => {
      await this.carImagesRepository.create({
        car_id,
        image_name,
      });
    });
  }
}

export { UploadCarImagesUseCase };
