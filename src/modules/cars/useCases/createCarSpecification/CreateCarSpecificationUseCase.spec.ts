import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: ICarsRepository;
let specificationsRepositoryInMemory: ISpecificationsRepository;
let createCarSpecification: CreateCarSpecificationUseCase;

describe("CreateCarSpecificationUseCase", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecification = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should be able to add a new specification to a car", async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      name: "Fiat",
      description: "Fiat description",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 10,
      brand: "Fiat",
      category_id: "1",
    });

    const { id: specification_id } =
      await specificationsRepositoryInMemory.create({
        name: "Airbag",
        description: "Airbag description",
      });

    const carSpecifications = await createCarSpecification.execute({
      car_id,
      specifications_id: [specification_id],
    });

    expect(carSpecifications.specifications).toHaveLength(1);
    expect(carSpecifications.specifications[0].name).toBe("Airbag");
  });

  it("Should not be able to add a new specification to a car that does not exists", async () => {
    expect(async () => {
      await createCarSpecification.execute({
        car_id: "1",
        specifications_id: ["1", "2"],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
