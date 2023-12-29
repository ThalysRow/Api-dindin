import { Router } from "express";
import { newUser } from "../controllers/userControllers";
import { validateNewUser } from "../middleware/userValidate";
import { validateBody } from "../middleware/validateBody";
import { schemaUser } from "../utils/schemas";

const userRouter = Router();

userRouter.post("/user", validateBody(schemaUser), validateNewUser, newUser);

export default userRouter;
