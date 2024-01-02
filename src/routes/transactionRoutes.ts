import { Router } from "express";
import { validateBody } from "../middleware/validateBody";
import { schemaTransaction } from "../utils/schemas";
import { validateNewTransaction } from "../middleware/validateNewTransaction";
import { newTransation } from "../controllers/transactionsControllers";
import { authentication } from "../middleware/authentication";

const transactionRouter = Router();

transactionRouter.use(authentication);
transactionRouter.post(
  "/transaction",
  validateBody(schemaTransaction),
  validateNewTransaction,
  newTransation
);

export default transactionRouter;
