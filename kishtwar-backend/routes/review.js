// routes/review.js
import express from "express";
import Review from "../models/Review.js";
import { sendMail } from "../utils/mailer.js";

const router = express.Router();

// =====================
// POST: Submit a new review + send email
// =====================
router.post("/", async (req, res) => {
  const { name, location, message, rating } = req.body;

  // ✅ Validation
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
    // ✅ Save review in MongoDB
    const newReview = new Review({ name, location, message, rating });
    await newReview.save();

    // ✅ Send professional email notification
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 650px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #004aad; color: #fff; padding: 15px 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">New Review Submitted</h2>
        </div>

        <div style="padding: 20px; background-color: #f9f9f9;">
          <p style="font-size: 14px; margin-bottom: 20px; text-align: center;">
            A new review has been submitted via your website
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Name</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Location</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${location}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Rating</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${rating} / 5</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Message</td>
              <td style="padding: 10px; border: 1px solid #ccc; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

        </div>

        <div style="background-color: #f1f1f1; padding: 10px 20px; text-align: center; font-size: 12px; color: #777;">
          Kishtwar Gold &copy; ${new Date().getFullYear()}
        </div>
      </div>
    `;

    await sendMail({
      to: process.env.ZOHO_EMAIL,
      subject: `New Review from ${name}`,
      text: `Review from ${name} (${location}) - Rating: ${rating}/5\n\n${message}`,
      html: emailHtml,
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      data: newReview,
    });
  } catch (error) {
    console.error("❌ Error in review POST:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Server error. Please try again later.",
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
    console.error("❌ Error fetching reviews:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
});

export default router;
