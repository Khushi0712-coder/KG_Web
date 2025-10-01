import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, location, message, rating } = req.body;

    if (!name || !location || !message || !rating) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newReview = new Review({ name, location, message, rating });
    await newReview.save();

    res.status(201).json({ msg: "Review submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all reviews (optional)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
