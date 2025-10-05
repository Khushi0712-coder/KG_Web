// routes/message.js
import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// =====================
// POST: Save a new message
// =====================
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields are required.",
    });
  }

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
});

// =====================
// GET: Fetch all messages
// =====================
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
});

export default router;
