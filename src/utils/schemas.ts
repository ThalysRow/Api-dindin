import joi, { ObjectSchema } from "joi";
import { SchemaUser } from "../types/types";

export const schemaUser: ObjectSchema<SchemaUser> = joi.object({
  name: joi
    .string()
    .required()
    .min(5)
    .max(25)
    .custom((name, helpers) => {
      if (name.trim() === "") {
        return helpers.message({ message: "Name format invalid" });
      }
    })
    .messages({
      "string.empty": "The name field cannot be empty",
      "any.required": "The name field is required",
      "string.min": "The name must have at least 5 characters",
      "string.max": "The name must have a maximum of 25 characters",
      "string.base": "The name field must receive a string",
      custom: "Name format invalid",
    }),

  email: joi.string().required().email().messages({
    "any.required": "The email field is required",
    "string.empty": "The email field cannot be empty",
    "string.email": "The email format is invalid",
  }),

  password: joi
    .string()
    .required()
    .min(8)
    .max(20)
    .custom((pass, helpers) => {
      if (pass.trim() === "" || pass.includes(" ")) {
        return helpers.message({ message: "Password format is invalid" });
      }
    })
    .messages({
      "any.required": "The passwrod field is required",
      "string.empty": "The password field cannot be empty",
      "string.min": "The password must have at least 8 characters",
      "string.max": "The password must have a maximum of 20 characters",
      custom: "Password format invalid",
    }),
});

export const schemaTransaction = joi.object({
  description: joi
    .string()
    .required()
    .custom((custom, helpers) => {
      if (custom.trim() === "") {
        return helpers.message({ message: "Format description invalid" });
      }
    })
    .messages({
      "any.required": "The description field is required",
      "string.empty": "The description field cannot be empty",
      custom: "Format description invalid",
    }),

  value: joi.number().required().positive().integer().messages({
    "number.base": "The value field is a number",
    "any.required": "The value field is required",
    "number.positive": "The value field is a number positive",
    "number.integer": "Please, in the value field, enter in cents format",
  }),

  category_id: joi.number().required().positive().integer().messages({
    "any.required": "The category_id field is required",
    "number.base": "The category_id field is a number",
    "number.positive": "The category_id field required a positive number",
    "number.integer": "The category_id field required a integer number ",
  }),

  type: joi
    .string()
    .required()
    .custom((custom, helpers) => {
      if (custom.trim() === "") {
        return helpers.message({ message: "Format type invalid" });
      }
    })
    .messages({
      "any.required": "The type field is required",
      "string.empty": "The type field cannot be empty",
    }),
});
