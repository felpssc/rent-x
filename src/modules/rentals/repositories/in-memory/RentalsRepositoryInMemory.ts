import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      start_date: new Date(),
      expected_return_date,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findInProgressRentalByCarId(car_id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => {
      return rental.car_id === car_id && !rental.end_date;
    });

    return rental;
  }

  async findInProgressRentalByUserId(user_id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => {
      return rental.user_id === user_id && !rental.end_date;
    });

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => {
      return rental.id === id;
    });

    return rental;
  }

  async devolution(rental: Rental): Promise<void> {
    const rentalIndex = this.rentals.findIndex((r) => {
      return r.id === rental.id;
    });

    this.rentals[rentalIndex].end_date = new Date();
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => {
      return rental.user_id === user_id;
    });

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
