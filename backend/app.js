import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Socialize API is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
