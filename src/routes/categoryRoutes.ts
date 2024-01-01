import { Router } from "express";
import { authentication } from "../middleware/authentication";
import { showcategories } from "../controllers/categoryControllers";

const categoryRouter = Router();

categoryRouter.use(authentication);
categoryRouter.get("/category", showcategories);

export default categoryRouter;
