import { Request, Response, NextFunction } from "express";
import { knex } from "../../database/connection";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../../utils/usersFunctions";
interface CustomRequest extends Request {
  userId?: number;
}

export const validateUpdateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user && user.id !== req.userId) {
      return res.status(400).json({ message: "email in use" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: "Erro in validate update user" });
  }
};
