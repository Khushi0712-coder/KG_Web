import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// POST: Create a new review
router.post("/", async (req, res) => {
  try {
    const { name, location, message, rating } = req.body;

    if (!name || !location || !message || !rating) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newReview = new Review({ name, location, message, rating });
    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Review POST error:", error);
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
});

// GET: Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error("Review GET error:", error);
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
});

export default router;
