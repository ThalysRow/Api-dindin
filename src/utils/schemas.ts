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
