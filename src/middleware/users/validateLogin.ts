import { knex } from "../../database/connection";
import { Request, Response, NextFunction } from "express";
import { User } from "../../types/types";
import bcrypt from "bcrypt";

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    const emailFind = await knex<User>("users").where("email", email).first();
    if (!emailFind) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const pass = emailFind.password;

    const validatePass = await bcrypt.compare(password, pass);
    if (!validatePass) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: "Erro in validate login" });
  }
};
