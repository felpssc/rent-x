import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepository: ICarsRepository;
let createCarUseCase: CreateCarUseCase;

describe("CreateCarUseCase", () => {
  beforeEach(async () => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f3f8f8f-c9c9-4c4c-b8b8-8b8b8b8b8b8b",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with same license plate", async () => {
    await createCarUseCase.execute({
      name: "Fusca",
      description: "",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f3f8f8f-c9c9-4c4c-b8b8-8b8b8b8b8b8b",
    });

    await expect(
      createCarUseCase.execute({
        name: "Fusca",
        description: "",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "5f3f8f8f-c9c9-4c4c-b8b8-8b8b8b8b8b8b",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f3f8f8f-c9c9-4c4c-b8b8-8b8b8b8b8b8b",
    });

    expect(car.available).toBe(true);
  });
});
