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







// // routes/message.js
// import express from "express";
// import Message from "../models/Message.js";
// import { sendMail } from "../utils/mailer.js";

// const router = express.Router();

// // =====================
// // POST: Save a new message + send email
// // =====================
// router.post("/", async (req, res) => {
//   const { name, email, message } = req.body;

//   // ✅ Validation
//   if (!name || !email || !message) {
//     return res.status(400).json({
//       success: false,
//       error: "All fields are required.",
//     });
//   }

//   try {
//     // ✅ Save message in MongoDB
//     const newMessage = new Message({ name, email, message });
//     await newMessage.save();

//     // ✅ Send email notification to Zoho
//     const emailHtml = `
//       <div style="font-family: Arial, sans-serif; color: #333; max-width: 650px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
//         <div style="background-color: #004aad; color: #fff; padding: 15px 20px; text-align: center;">
//           <h2 style="margin: 0; font-size: 22px;">New Message Received</h2>
//         </div>

//         <div style="padding: 20px; background-color: #f9f9f9;">
//           <p style="font-size: 14px; margin-bottom: 20px; text-align: center;">
//             You have received a new message via your website
//           </p>

//           <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//             <tr>
//               <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Name</td>
//               <td style="padding: 10px; border: 1px solid #ccc;">${name}</td>
//             </tr>
//             <tr>
//               <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Email</td>
//               <td style="padding: 10px; border: 1px solid #ccc;">${email}</td>
//             </tr>
//             <tr>
//               <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Message</td>
//               <td style="padding: 10px; border: 1px solid #ccc; white-space: pre-wrap;">${message}</td>
//             </tr>
//           </table>

//         </div>

//         <div style="background-color: #f1f1f1; padding: 10px 20px; text-align: center; font-size: 12px; color: #777;">
//           Kishtwar Bloom &copy; ${new Date().getFullYear()}
//         </div>
//       </div>
//     `;

//     await sendMail({
//       to: process.env.ZOHO_EMAIL,
//       subject: `New Message from ${name}`,
//       text: `Message from ${name} (${email}): ${message}`,
//       html: emailHtml,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Message sent successfully!",
//       data: newMessage,
//     });
//   } catch (error) {
//     console.error("❌ Error in message POST:", error);
//     return res.status(500).json({
//       success: false,
//       error: error.message || "Server error. Please try again later.",
//     });
//   }
// });

// // =====================
// // GET: Fetch all messages (admin/test)
// // =====================
// router.get("/", async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 });
//     return res.status(200).json({ success: true, data: messages });
//   } catch (error) {
//     console.error("❌ Error fetching messages:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Server error. Please try again later.",
//     });
//   }
// });

// export default router;
