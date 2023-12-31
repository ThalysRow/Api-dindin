import { Request, Response } from "express";
import { knex } from "../database/connection";
import { Transactions } from "../types/types";
import { formatedResponse } from "../utils/transactionsFunctions";
import { formateData } from "../utils/usersFunctions";
interface CustomRequest extends Request {
  userId?: number;
}

export const newTransation = async (req: CustomRequest, res: Response) => {
  const { description, value, category_id, type } = req.body;

  try {
    await knex<Transactions>("transactions").insert({
      description,
      value,
      category_id,
      user_id: req.userId,
      type,
      data: new Date(),
    });

    const data = await formatedResponse(req.userId as number);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Erro in new transation" });
  }
};

export const transactionsListen = async (req: CustomRequest, res: Response) => {
  const { filter } = req.query;

  if (filter) {
    const filters = Array.isArray(filter) ? filter : [filter];

    const result = await knex<Transactions>("transactions")
      .where("user_id", req.userId)
      .join("categories", "category_id", "=", "categories.id")
      .select("transactions.*", "categories.description as categories_name")
      .whereIn("categories.description", filters)
      .orWhere((builder) => {
        for (const filter of filters) {
          builder.orWhereRaw("categories.description ilike ?", [`%${filter}%`]);
        }
      });

    return res.json(result);
  }

  try {
    const listen = await knex<Transactions>("transactions").where(
      "user_id",
      req.userId
    );
    return res.json(listen);
  } catch (error) {
    return res.status(400).json({ message: "Erro in transactions listen" });
  }
};

export const getTransaction = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  try {
    const transaction = await knex<Transactions>("transactions")
      .where("id", id)
      .first();
    return res.json(transaction);
  } catch (error) {
    return res.status(400).json({ message: "Erro in get transaction" });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, value, category_id, type } = req.body;
  try {
    await knex<Transactions>("transactions")
      .where("id", id)
      .update({
        description: formateData(description),
        value,
        category_id,
        type,
        data: new Date(),
      });

    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ message: "Erro in update transaction" });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await knex<Transactions>("transactions").where("id", id).delete();
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ message: "Erro in delete transaction" });
  }
};

export const extract = async (req: CustomRequest, res: Response) => {
  try {
    const entradaSum = await knex<Transactions>("transactions")
      .where({
        user_id: req.userId,
        type: "entrada",
      })
      .select(knex.raw("coalesce(sum(value), 0) as total"))
      .first();

    const saidaSum = await knex<Transactions>("transactions")
      .where({
        user_id: req.userId,
        type: "saida",
      })
      .select(knex.raw("coalesce(sum(value), 0) as total"))
      .first();

    const data = {
      entrada: entradaSum,
      saida: saidaSum,
    };

    return res.json(data);
  } catch (error) {
    return res.status(400).json({ message: "Erro in extract" });
  }
};
