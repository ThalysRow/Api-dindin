import { Router } from "express";
import { validateBody } from "../middleware/validateBody";
import { schemaTransaction } from "../utils/schemas";
import { validateNewTransaction } from "../middleware/validateNewTransaction";
import {
  getTransaction,
  newTransation,
  transactionsListen,
} from "../controllers/transactionsControllers";
import { authentication } from "../middleware/authentication";
import { validateGetTransaction } from "../middleware/validateGetTransaction";

const transactionRouter = Router();

transactionRouter.use(authentication);

transactionRouter.post(
  "/transaction",
  validateBody(schemaTransaction),
  validateNewTransaction,
  newTransation
);
transactionRouter.get("/transaction", transactionsListen);
transactionRouter.get(
  "/transaction/:id",
  validateGetTransaction,
  getTransaction
);

export default transactionRouter;
