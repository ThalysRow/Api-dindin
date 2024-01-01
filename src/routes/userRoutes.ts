import { Router } from "express";
import { loginUser, newUser, userInfo } from "../controllers/userControllers";
import { validateNewUser } from "../middleware/userValidate";
import { validateBody } from "../middleware/validateBody";
import { schemaUser } from "../utils/schemas";
import { validateLogin } from "../middleware/validateLogin";
import { authentication } from "../middleware/authentication";

const userRouter = Router();

userRouter.post("/user", validateBody(schemaUser), validateNewUser, newUser);
userRouter.post("/login", validateLogin, loginUser);

userRouter.use(authentication);

userRouter.get("/user", userInfo);

export default userRouter;
