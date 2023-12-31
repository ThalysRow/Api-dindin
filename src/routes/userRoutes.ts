import { Router } from "express";
import { loginUser, newUser } from "../controllers/userControllers";
import { validateNewUser } from "../middleware/userValidate";
import { validateBody } from "../middleware/validateBody";
import { schemaUser } from "../utils/schemas";
import { validateLogin } from "../middleware/validateLogin";

const userRouter = Router();

userRouter.post("/user", validateBody(schemaUser), validateNewUser, newUser);
userRouter.post("/login", validateLogin, loginUser);

export default userRouter;
