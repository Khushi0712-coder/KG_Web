import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import reviewRoutes from "./routes/review.js";
import messageRoutes from "./routes/message.js";
import contactRoutes from "./routes/contact.js";
import paymentRoutes from "./routes/payment.js";

import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();

// =====================
// MongoDB Connection
// =====================
connectDB()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message || err);
    process.exit(1);
  });

// =====================
// Middleware
// =====================
app.use(morgan("dev"));
app.use(express.json());

// =====================
// CORS Setup
// =====================
const allowedOrigins = [
  "http://localhost:5174", // React frontend
  process.env.LOCAL_FRONTEND,
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
  process.env.LIVE_FRONTEND,
  process.env.LIVE_FRONTEND_NOWWW,
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server requests or Postman (no origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);

    console.log("Blocked CORS request from:", origin);
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // send cookies if needed
};

// ✅ Apply CORS globally
app.use(cors(corsOptions));

// =====================
// API Routes
// =====================
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);

// =====================
// Test API
// =====================
app.get("/api", (req, res) => {
  res.json({ success: true, message: "Backend is up and running 🚀" });
});

// =====================
// Serve React Frontend (optional)
// =====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === "production") {
//   const clientBuildPath = path.resolve(__dirname, "../kishtwar-frontend/dist");
//   app.use(express.static(clientBuildPath));
//   app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(clientBuildPath, "index.html"));
//   });
// }

// =====================
// Global Error Handler
// =====================
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ success: false, error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
