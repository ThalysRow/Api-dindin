import { StringSchema } from "joi";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Categories = {
  id: number;
  description: string;
};

export type Transactions = {
  id: number;
  description: string;
  value: number;
  date: Date;
  category_id: number;
  user_id: number;
  type: string;
};

export type SchemaUser = {
  name: StringSchema<string>;
  email: StringSchema<string>;
  password: StringSchema<string>;
};
