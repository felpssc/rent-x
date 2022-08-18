import "dotenv/config";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    getAvatarUrl,
  }: User): IUserResponseDTO {
    const user = {
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url: getAvatarUrl(avatar),
    };

    return user;
  }
}

export { UserMap };
