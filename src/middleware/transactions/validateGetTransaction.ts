import { Request, Response, NextFunction } from "express";
import { knex } from "../../database/connection";
interface CustomRequest extends Request {
  userId?: number;
}

export const validateGetTransaction = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const transaction = await knex("transactions").where("id", id).first();

    if (!transaction || transaction.user_id !== req.userId) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Erro in validate get transaction" });
  }
};
