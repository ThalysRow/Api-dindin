import { knex } from "../database/connection";

export const formatedResponse = async (number: number) => {
  const data = await knex("transactions")
    .join("categories", "category_id", "=", "categories.id")
    .select("transactions.*", "categories.description as categorie_name")
    .where("user_id", number)
    .orderBy("transactions.id", "desc")
    .first();

  const dataFormated = {
    id: data.id,
    type: data.type,
    description: data.description,
    value: data.value,
    date: data.data,
    user_id: data.user_id,
    category_id: data.category_id,
    category_name: data.categorie_name,
  };
  return dataFormated;
};
