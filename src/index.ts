import express from "express";
import "dotenv/config";
import userRouter from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log("Running");
});
