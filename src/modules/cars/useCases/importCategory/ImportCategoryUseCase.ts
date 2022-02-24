import { Parser } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IIMportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IIMportCategory[]> {
    return new Promise((resolve) => {
      const categories: IIMportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = new Parser({
        delimiter: ",",
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (row) => {
          const [name, description] = row;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const { name, description } = category;

      const alreadyExists = await this.categoriesRepository.findByName(name);

      if (!alreadyExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
