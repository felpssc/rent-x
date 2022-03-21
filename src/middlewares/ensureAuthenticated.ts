import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = jwt.verify(
      token,
      "a04a42497fbe95ab2c02c8a2c0d6cbe6"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exists");
    }

    next();
  } catch (err) {
    throw new Error("Invalid JWT token");
  }
}
