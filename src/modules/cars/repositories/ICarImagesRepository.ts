import { ICreateCarImageDTO } from "../dtos/ICreateCarImageDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImagesRepository {
  create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarImagesRepository };
