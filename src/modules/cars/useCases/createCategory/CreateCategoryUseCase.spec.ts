import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("CreateCategoryUseCase", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category 1",
      description: "Category 1 description",
    };

    await createCategoryUseCase.execute(category);

    const categoryExists = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryExists).toHaveProperty("id");
    expect(categoryExists).toHaveProperty("name", "Category 1");
  });

  it("Should not be able to create a new category with same name", async () => {
    const category = {
      name: "Category 1",
      description: "Category 1 description",
    };

    await createCategoryUseCase.execute(category);

    await expect(
      createCategoryUseCase.execute(category)
    ).rejects.toBeInstanceOf(AppError);
  });
});
