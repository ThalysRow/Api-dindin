import express from "express";
import "dotenv/config";
import userRouter from "./routes/userRoutes";
import categoryRouter from "./routes/categoryRoutes";

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(categoryRouter);

app.listen(process.env.PORT, () => {
  console.log("Running");
});
