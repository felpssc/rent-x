import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

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
    }).rejects.toEqual(new AppError("Email or password invalid", 401));
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
    }).rejects.toEqual(new AppError("Email or password invalid", 401));
  });
});
