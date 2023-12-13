import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import sslRouter from "./routers/sslcommerz.router.js";
import { dbconnect } from "./config/database.config.js";
import adminRouter from "./routers/admin.router.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api", express.static(path.join(__dirname, "../uploader")));

dbconnect();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
    // origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/ssl", sslRouter);
app.use("/api/admin", adminRouter);
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found",
  });

  next();
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
