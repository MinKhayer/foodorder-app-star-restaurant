import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import sslRouter from "./routers/sslcommerz.router.js";
import { dbconnect } from "./config/database.config.js";
dbconnect();
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    // origin: "*",
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/ssl", sslRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
