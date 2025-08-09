import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import assessmentRoutes from "./routes/assessmentRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/assessments", assessmentRoutes);

export default app;
