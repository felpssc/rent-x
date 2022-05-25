import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const MIN_RENTAL_DURATION = 24;

    const isCarUnavailable =
      await this.rentalsRepository.findInProgressRentalByCarId(car_id);

    if (isCarUnavailable) {
      throw new AppError("The car is not available for rental");
    }

    const userAlreadyHasRental =
      await this.rentalsRepository.findInProgressRentalByUserId(user_id);

    if (userAlreadyHasRental) {
      throw new AppError("The user already has a rental in progress");
    }

    const diffInHours = this.dateProvider.compareInHours(
      expected_return_date,
      this.dateProvider.dateNow()
    );

    if (diffInHours < MIN_RENTAL_DURATION) {
      throw new AppError("The rental must be at least for 24 hours");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
