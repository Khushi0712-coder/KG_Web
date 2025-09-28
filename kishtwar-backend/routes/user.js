import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST: Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: "Name and email are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User with this email already exists" });
    }

    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("User POST error:", err);
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
});

// GET: Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error("User GET error:", err);
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
});

export default router;
