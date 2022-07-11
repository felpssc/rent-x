import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("SendForgotPasswordMailUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });
  it("Should be able to send forgot password mail", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      name: "John Doe",
      email: "bicu@ocehos.tp",
      password: "Fn3X6VWk",
      driver_license: "Fn3X6VWk",
    });

    await sendForgotPasswordMailUseCase.execute("bicu@ocehos.tp");

    expect(mailProviderInMemory.messages).toHaveLength(1);
    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send forgot password mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("bicu@ocehos.tp")
    ).rejects.toEqual(new AppError("User does not exists."));
  });

  it("Should be able to create user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokenRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      name: "John Doe",
      email: "ozili@zame.is",
      password: "Fn3X6VWk",
      driver_license: "Fn3X6VWk",
    });

    await sendForgotPasswordMailUseCase.execute("ozili@zame.is");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
