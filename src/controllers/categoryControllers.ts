import { Request, Response } from "express";
import { knex } from "../database/connection";
import { Categories } from "../types/types";

export const showcategories = async (req: Request, res: Response) => {
  try {
    const categories = await knex<Categories>("categories");
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({ message: "Erro in show categories" });
  }
};
