import { knex } from "../database/connection";
import { User } from "../types/types";

export const formateData = (data: string): string => {
  const stringToArray = data.trim().split(" ");

  for (let i = 0; i < stringToArray.length; i++) {
    stringToArray[i] =
      stringToArray[i][0].toUpperCase() +
      stringToArray[i].slice(1).toLowerCase();
  }

  return stringToArray.join(" ");
};

export const findUserByEmail = async (email: string): Promise<User> => {
  const user = await knex<User>("users").where("email", email).first();
  return user as User;
};

export const findUserById = async (id: number): Promise<User> => {
  const user = await knex<User>("users").where("id", id).first();
  return user as User;
};
