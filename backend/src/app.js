import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import advancedRoutes from "./routes/advancedRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import gamificationRoutes from "./routes/gamificationRoutes.js";
import grammarRoutes from "./routes/grammarRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import vocabularyRoutes from "./routes/vocabularyRoutes.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function isLocalDevOrigin(origin) {
  return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
}

const apiLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 300),
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(compression());
app.use(apiLimiter);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS: Origin not allowed"));
    },
    credentials: process.env.CORS_ALLOW_CREDENTIALS === "true",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    message: "Backend is running",
    env: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/grammar", grammarRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/gamification", gamificationRoutes);
app.use("/api/advanced", advancedRoutes);

app.use("/api/*", (_req, res) => {
  res.status(404).json({ message: "API route not found" });
});

app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  res.status(statusCode).json({ message });
});

export default app;
