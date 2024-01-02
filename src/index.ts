import express from "express";
import "dotenv/config";
import userRouter from "./routes/userRoutes";
import categoryRouter from "./routes/categoryRoutes";
import transactionRouter from "./routes/transactionRoutes";

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(categoryRouter);
app.use(transactionRouter);

app.listen(process.env.PORT, () => {
  console.log("Running");
});
