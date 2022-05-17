import { ICreateCarImageDTO } from "../dtos/ICreateCarImageDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImagesRepository {
  create({ carId, imageName }: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarImagesRepository };
