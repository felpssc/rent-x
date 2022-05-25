import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDataProvider: DayjsDateProvider;

describe("CreateRentalUseCase", () => {
  const currentDateAddOneDay = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDataProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDataProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "user-id",
      car_id: "car-id",
      expected_return_date: currentDateAddOneDay,
    });

    expect(rental).toHaveProperty("id");
  });

  it("Should not be able to create a new rental with a car that is already rented", async () => {
    await createRentalUseCase.execute({
      user_id: "user-id",
      car_id: "car-id",
      expected_return_date: currentDateAddOneDay,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "another-user-id",
        car_id: "car-id",
        expected_return_date: currentDateAddOneDay,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with a user that has a rental in progress", async () => {
    await createRentalUseCase.execute({
      user_id: "user-id",
      car_id: "car-id",
      expected_return_date: currentDateAddOneDay,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "user-id",
        car_id: "another-car-id",
        expected_return_date: currentDateAddOneDay,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with a rental duration less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "user-id",
        car_id: "car-id",
        expected_return_date: new Date(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
