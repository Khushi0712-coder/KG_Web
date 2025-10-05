// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import paymentRoutes from "./routes/payment.js";
import reviewRoutes from "./routes/review.js";
import messageRoutes from "./routes/message.js";
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
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// =====================
// Middleware
// =====================
// Logging (optional for production)
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// CORS setup
const allowedOrigins = [
  process.env.LOCAL_FRONTEND,   // http://localhost:5173
  process.env.FRONTEND_URL,     // Vercel preview
  process.env.CLIENT_URL,       // Custom domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman / server requests
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// =====================
// API Routes
// =====================
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);

// =====================
// Test API
// =====================
app.get("/api", (req, res) => {
  res.json({ success: true, message: "Backend is up and running 🚀" });
});

// =====================
// Serve React Frontend in Production (Optional for Vercel frontend)
// =====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === "production") {
//   const clientBuildPath = path.resolve(__dirname, "../kishtwar-frontend/dist");
//   app.use(express.static(clientBuildPath));

//   // Catch-all route for React (must be AFTER API routes)
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
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
