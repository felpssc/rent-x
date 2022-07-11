import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  private usersToken: UserTokens[] = [];

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    });

    this.usersToken.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersToken.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );

    return userToken;
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    const userToken = this.usersToken.find(
      (userToken) => userToken.refresh_token === token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.usersToken.findIndex(
      (userToken) => userToken.id === id
    );

    this.usersToken.splice(userTokenIndex, 1);
  }
}

export { UsersTokenRepositoryInMemory };
