import { Request, Response, NextFunction } from "express";
import { knex } from "../database/connection";

export const validateNewTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type, category_id } = req.body;

  if (
    type.trim().toLowerCase() !== "saida" &&
    type.trim().toLowerCase() !== "entrada"
  ) {
    return res.status(400).json({
      message: "Format type invalid, is required 'entrada' or 'saida'",
    });
  }

  try {
    const categorie = await knex("categories").where("id", category_id).first();
    if (!categorie) {
      return res.status(404).json({ message: "Categorie not found" });
    }

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Erro in validate new transaction" });
  }
};
