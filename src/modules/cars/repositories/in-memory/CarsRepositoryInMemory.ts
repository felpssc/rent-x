import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository, IRequest } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAvailableCars({
    name,
    brand,
    category_id,
  }: IRequest): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available);

    if (name) cars = cars.filter((car) => car.name === name);

    if (brand) cars = cars.filter((car) => car.brand === brand);

    if (category_id)
      cars = cars.filter((car) => car.category_id === category_id);

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    if (car) {
      car.available = available;
    }

    return car;
  }
}

export { CarsRepositoryInMemory };
