import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  findInProgressRentalByCarId(car_id: string): Promise<Rental | undefined>;
  findInProgressRentalByUserId(user_id: string): Promise<Rental | undefined>;
  findById(id: string): Promise<Rental | undefined>;
  devolution(rental: Rental): Promise<void>;
}

export { IRentalsRepository };
