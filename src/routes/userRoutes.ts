import { Router } from "express";
import {
  loginUser,
  newUser,
  updateUser,
  userInfo,
} from "../controllers/userControllers";
import { validateNewUser } from "../middleware/validateNewUser";
import { validateBody } from "../middleware/validateBody";
import { schemaUser } from "../utils/schemas";
import { validateLogin } from "../middleware/validateLogin";
import { authentication } from "../middleware/authentication";
import { validateUpdateUser } from "../middleware/validateUpdateUser";

const userRouter = Router();

userRouter.post("/user", validateBody(schemaUser), validateNewUser, newUser);
userRouter.post("/login", validateLogin, loginUser);

userRouter.use(authentication);

userRouter.get("/user", userInfo);
userRouter.put(
  "/user",
  validateBody(schemaUser),
  validateUpdateUser,
  updateUser
);

export default userRouter;
