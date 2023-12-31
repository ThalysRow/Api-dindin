import { Router } from "express";
import { validateBody } from "../middleware/validateBody";
import { schemaTransaction } from "../utils/schemas";
import { validateNewTransaction } from "../middleware/transactions/validateNewTransaction";
import {
  deleteTransaction,
  extract,
  getTransaction,
  newTransation,
  transactionsListen,
  updateTransaction,
} from "../controllers/transactionsControllers";
import { authentication } from "../middleware/authentication";
import { validateGetTransaction } from "../middleware/transactions/validateGetTransaction";
import { validateUpdateTransaction } from "../middleware/transactions/validateUpdateTransaction";

const transactionRouter = Router();

transactionRouter.use(authentication);

transactionRouter.post(
  "/transaction",
  validateBody(schemaTransaction),
  validateNewTransaction,
  newTransation
);

transactionRouter.get("/transaction", transactionsListen);

transactionRouter.get("/transaction/extract", extract);

transactionRouter.get(
  "/transaction/:id",
  validateGetTransaction,
  getTransaction
);

transactionRouter.put(
  "/transaction/:id",
  validateBody(schemaTransaction),
  validateUpdateTransaction,
  updateTransaction
);

transactionRouter.delete(
  "/transaction/:id",
  validateGetTransaction,
  deleteTransaction
);

export default transactionRouter;
