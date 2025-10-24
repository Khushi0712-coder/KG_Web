

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




// import express from "express";
// import Contact from "../models/Contact.js";
// import { sendMail } from "../utils/mailer.js";

// const router = express.Router();

// // POST: Save contact + send email
// router.post("/", async (req, res) => {
//   const { name, email, subject = "", message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ success: false, error: "All fields are required." });
//   }

//   try {
//     // 1️⃣ Save in DB
//     const newContact = await Contact.create({ name, email, subject, message });

//     // 2️⃣ Send email
//     const emailHtml = `
//       <div style="font-family:sans-serif; padding:20px; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:5px;">
//         <h2 style="text-align:center; color:#333;">New Contact Form Submission</h2>
//         <table style="width:100%; border-collapse:collapse; margin-top:20px;">
//           <tr><td style="padding:8px; border:1px solid #ddd;"><b>Name</b></td><td style="padding:8px; border:1px solid #ddd;">${name}</td></tr>
//           <tr><td style="padding:8px; border:1px solid #ddd;"><b>Email</b></td><td style="padding:8px; border:1px solid #ddd;">${email}</td></tr>
//           <tr><td style="padding:8px; border:1px solid #ddd;"><b>Subject</b></td><td style="padding:8px; border:1px solid #ddd;">${subject}</td></tr>
//           <tr><td style="padding:8px; border:1px solid #ddd;"><b>Message</b></td><td style="padding:8px; border:1px solid #ddd;">${message}</td></tr>
//         </table>
//       </div>
//     `;

//     await sendMail({
//       to: process.env.ZOHO_EMAIL,
//       subject: `New Contact Form Submission from ${name}`,
//       text: `Message from ${name} (${email}): ${message}`,
//       html: emailHtml,
//     });

//     // 3️⃣ Send response to frontend
//     return res.status(201).json({
//       success: true,
//       message: "Contact form submitted successfully!",
//       data: newContact,
//     });
//   } catch (error) {
//     console.error("❌ Contact POST error:", error);
//     return res.status(500).json({ success: false, error: error.message || "Server error." });
//   }
// });

// // GET: optional test or fetch all contacts
// router.get("/", async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     return res.status(200).json({ success: true, data: contacts });
//   } catch (error) {
//     console.error("❌ Contact GET error:", error);
//     return res.status(500).json({ success: false, error: "Server error." });
//   }
// });

// export default router;


