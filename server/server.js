import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Render & Vercel friendly CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server, Render health check)
      if (!origin) return callback(null, true);
      // Allow any Vercel preview or production deployment domain
      if (origin.endsWith(".vercel.app") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for portfolio API
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Root Status Route (for Render Health Checks & Ping)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "Portfolio API is running smoothly on Render",
    healthCheck: "/api/health",
    version: "2.0.0",
  });
});

// Health Check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Cyber Portfolio API",
  });
});

// Mount Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Server] Portfolio backend running on port ${PORT} (0.0.0.0)`);
});
