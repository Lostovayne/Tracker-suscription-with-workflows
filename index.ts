import cookieParser from "cookie-parser";
import express, { type Request, type Response } from "express";
import { PORT } from "./config/env";

// Imports routes for the various resources
import connectToDatabase from "./database/mongodb";
import errorMiddleware from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import userRoutes from "./routes/user.routes";
import arcjetMiddleware from "./middleware/arcjet.middleware";

const app = express();
const BASE_API_PATH = "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use(`${BASE_API_PATH}/subscriptions`, subscriptionRoutes);
app.use(`${BASE_API_PATH}/users`, userRoutes);
app.use(`${BASE_API_PATH}/auth`, authRoutes);

app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker running on port ${PORT}`);
  await connectToDatabase();
});
