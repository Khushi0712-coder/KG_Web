// routes/review.js
import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// =====================
// POST: Submit a new review
// =====================
router.post("/", async (req, res) => {
  const { name, location, message, rating } = req.body;

  if (!name || !location || !message || rating == null) {
    return res.status(400).json({
      success: false,
      error: "All fields (name, location, message, rating) are required.",
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      error: "Rating must be between 1 and 5.",
    });
  }

  try {
    const newReview = new Review({ name, location, message, rating });
    await newReview.save();

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      data: newReview,
    });
  } catch (error) {
    console.error("Error saving review:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
});

// =====================
// GET: Fetch all reviews
// =====================
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
});

export default router;
