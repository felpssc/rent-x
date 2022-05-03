import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: ICarsRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let createCarUseCase: CreateCarUseCase;

describe("ListAvailableCarsUseCase", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "1",
    });

    await createCarUseCase.execute({
      name: "Ferrari",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 10,
      brand: "VW",
      category_id: "1",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toHaveLength(2);
    expect(cars[0]).toHaveProperty("id");
    expect(cars[1]).toHaveProperty("id");
  });

  it("Should be able to filter available car by name, brand and category", async () => {
    await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "1",
    });

    await createCarUseCase.execute({
      name: "Ferrari",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 10,
      brand: "VW",
      category_id: "1",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Fusca",
      brand: "VW",
      category_id: "1",
    });

    expect(cars).toHaveLength(1);
    expect(cars[0]).toHaveProperty("id");
  });
});
