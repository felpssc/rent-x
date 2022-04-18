import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("AuthenticateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      email: "user@email.com",
      name: "User",
      password: "123456",
      driver_license: "123456",
    };

    await createUserUseCase.execute(user);

    const userAuthenticated = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(userAuthenticated).toBeTruthy();
    expect(userAuthenticated.token).toBeTruthy();
  });

  it("Should not be able to authenticate a inexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "none@email.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate a user with wrong password", async () => {
    const user: ICreateUserDTO = {
      email: "user@email.com",
      name: "User",
      password: "123456",
      driver_license: "123456",
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
