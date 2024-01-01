import { knex } from "../database/connection";
import { Request, Response } from "express";
import { User } from "../types/types";
import bcrypt from "bcrypt";
import {
  findUserByEmail,
  findUserById,
  formateData,
} from "../utils/usersFunctions";
import jwt from "jsonwebtoken";
interface CustomRequest extends Request {
  userId?: number;
}

export const newUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    await knex<User>("users").insert({
      name: formateData(name),
      email,
      password: encryptedPassword,
    });

    const user = await findUserByEmail(email);
    const { password: _, ...userCreated } = user;

    return res.status(201).json(userCreated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro in new user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);

    const token = jwt.sign({ id: user.id }, process.env.PASS_JWT as string, {
      expiresIn: 30 * 60,
    });

    const { password: _, ...loggedUser } = user;

    return res.json({ loggedUser, token });
  } catch (error) {
    return res.status(400).json({ message: "Erro in login user" });
  }
};

export const userInfo = async (req: CustomRequest, res: Response) => {
  try {
    const user = await findUserById(req.userId as number);
    const { password: _, ...userInfo } = user;
    return res.json(userInfo);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Erro in user info" });
  }
};

export const updateUser = async (req: CustomRequest, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    await knex<User>("users")
      .update({ name: formateData(name), email, password: encryptedPassword })
      .where("id", req.userId);
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ message: "Erro in update user" });
  }
};
