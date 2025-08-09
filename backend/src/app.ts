import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import authRoutes from "./routes/auth.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(authMiddleware);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/auth", authRoutes);

export default app;