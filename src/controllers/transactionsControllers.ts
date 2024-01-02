import { Request, Response } from "express";
import { knex } from "../database/connection";
import { Transactions } from "../types/types";
import { formatedResponse } from "../utils/transactionsFunctions";
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
