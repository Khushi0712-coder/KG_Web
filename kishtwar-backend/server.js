// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import paymentRoutes from "./routes/payment.js";
import reviewRoutes from "./routes/review.js";
import messageRoutes from "./routes/message.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// ----------------------
// CORS Setup (local + Vercel)
// ----------------------
const allowedOrigins = [
  process.env.VERCEL_FRONTEND, // Vercel frontend
  process.env.LOCAL_FRONTEND    // Local frontend (Vite default port)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ----------------------
// Middleware
// ----------------------
app.use(express.json()); // Parse JSON requests

// ----------------------
// Routes
// ----------------------
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);

// Test API
app.get("/api", (req, res) => {
  res.send("Backend is up and running 🚀");
});

// ----------------------
// Serve frontend in production
// ----------------------
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const clientBuildPath = path.join(__dirname, "../kishtwar-frontend/dist"); // Vite build folder

  app.use(express.static(clientBuildPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// ----------------------
// Connect to MongoDB and start server
// ----------------------
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(
        `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
