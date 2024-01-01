import { Request, Response, NextFunction } from "express";
import { knex } from "../database/connection";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../types/types";
interface CustomRequest extends Request {
  userId?: number;
}

export const authentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authorization.split(" ")[1];

    const user = jwt.verify(
      token,
      process.env.PASS_JWT as string
    ) as JwtPayload;
    req.userId = user.id;

    const findUser = await knex<User>("users").where("id", req.userId).first();
    if (!findUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Erro in authentication" });
  }

  next();
};
