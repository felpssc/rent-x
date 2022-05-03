import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}
interface ICarsRepository {
  create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvailableCars({ name, brand, category_id }: IRequest): Promise<Car[]>;
}

export { ICarsRepository, IRequest };
