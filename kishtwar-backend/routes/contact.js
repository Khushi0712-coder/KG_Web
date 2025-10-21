import express from "express";
import Contact from "../models/Contact.js"; // ✅ contact model import

const router = express.Router();

// =====================
// POST: Save a new contact message
// =====================
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // ✅ Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "Please fill all required fields carefully.",
    });
  }

  try {
    // ✅ Save new contact message in MongoDB
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully!",
      data: newContact,
    });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
});

// =====================
// GET: Fetch all contact messages (for admin panel)
// =====================
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
});

export default router;
