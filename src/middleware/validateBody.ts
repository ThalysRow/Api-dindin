import { Request, Response, NextFunction } from "express";
import { SchemaUser } from "../types/types";
import { ObjectSchema } from "joi";

export const validateBody =
  (schema: ObjectSchema<SchemaUser>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (
        error !== null &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        return res.status(400).json({ message: error.message });
      }
    }
  };
