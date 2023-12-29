import { knex } from "../database/connection";
import { Request, Response } from "express";
import { User } from "../types/types";
import bcrypt from "bcrypt";
import { formateData } from "../utils/usersFunctions";

export const newUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    await knex<User>("users").insert({
      name: formateData(name),
      email,
      password: encryptedPassword,
    });

    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro in new user" });
  }
};
