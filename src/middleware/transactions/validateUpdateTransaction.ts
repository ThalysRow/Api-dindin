import { Request, Response, NextFunction } from "express";
import { knex } from "../../database/connection";
import { Transactions } from "../../types/types";
interface CustomRequest extends Request {
  userId?: number;
}

export const validateUpdateTransaction = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { category_id, type } = req.body;
  const { id } = req.params;

  try {
    const transaction = await knex<Transactions>("transactions")
      .where("id", id)
      .first();

    if (!transaction || transaction.user_id !== req.userId) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (
      type.trim().toLowerCase() !== "entrada" &&
      type.trim().toLowerCase() !== "saida"
    ) {
      return res
        .status(400)
        .json({ message: `Please insert "entrada" or "saida" in "type"` });
    }

    const category = await knex("categories").where("id", category_id).first();

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Erro in validate update transaction" });
  }
};
