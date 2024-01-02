import { Request, Response, NextFunction } from "express";
import { knex } from "../../database/connection";
import { User } from "../../types/types";

export const validateNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await knex<User>("users").where("email", email).first();
    if (user) {
      return res.status(400).json({ message: "E-mail already registered" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: "Erro in validate new user" });
  }
};
