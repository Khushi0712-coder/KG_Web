// // // import express from "express";
// // // import Contact from "../models/Contact.js"; // ✅ contact model import

// // // const router = express.Router();

// // // // =====================
// // // // POST: Save a new contact message
// // // // =====================
// // // router.post("/", async (req, res) => {
// // //   const { name, email, subject, message } = req.body;

// // //   // ✅ Validation
// // //   if (!name || !email || !subject || !message) {
// // //     return res.status(400).json({
// // //       success: false,
// // //       error: "Please fill all required fields carefully.",
// // //     });
// // //   }

// // //   try {
// // //     // ✅ Save new contact message in MongoDB
// // //     const newContact = new Contact({ name, email, subject, message });
// // //     await newContact.save();

// // //     return res.status(201).json({
// // //       success: true,
// // //       message: "Contact form submitted successfully!",
// // //       data: newContact,
// // //     });
// // //   } catch (error) {
// // //     console.error("❌ Error saving contact:", error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: "Server error. Please try again later.",
// // //     });
// // //   }
// // // });

// // // // =====================
// // // // GET: Fetch all contact messages (for admin panel)
// // // // =====================
// // // router.get("/", async (req, res) => {
// // //   try {
// // //     const contacts = await Contact.find().sort({ createdAt: -1 });
// // //     return res.status(200).json({ success: true, data: contacts });
// // //   } catch (error) {
// // //     console.error("❌ Error fetching contacts:", error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: "Server error. Please try again later.",
// // //     });
// // //   }
// // // });

// // // export default router;



// // // // routes/contact.js
// // // import express from "express";
// // // import { sendMail } from "../utils/mailer.js";

// // // const router = express.Router();

// // // // POST route — triggered when user submits the form
// // // router.post("/", async (req, res) => {
// // //   try {
// // //     const { name, email, message } = req.body;

// // //     if (!name || !email || !message) {
// // //       return res.status(400).json({ success: false, error: "All fields are required" });
// // //     }

// // //     // Send email to your Zoho inbox (like test-mail.js)
// // //     await sendMail({
// // //       to: process.env.ZOHO_EMAIL,
// // //       subject: `New Form Submission from ${name}`,
// // //       text: `Message from ${name} (${email}): ${message}`,
// // //       html: `<p>Message from <b>${name}</b> (${email}):</p><p>${message}</p>`,
// // //     });

// // //     res.status(200).json({ success: true, message: "Form submitted successfully!" });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, error: error.message });
// // //   }
// // // });

// // // // Optional GET route for testing
// // // router.get("/", (req, res) => {
// // //   res.json({ success: true, message: "Contact API is working ✅" });
// // // });

// // // export default router;




// // // routes/contact.js
// // import express from "express";
// // import Contact from "../models/Contact.js";
// // import { sendMail } from "../utils/mailer.js";

// // const router = express.Router();

// // // POST: Save contact message + send table-formatted email
// // router.post("/", async (req, res) => {
// //   const { name, email, subject = "No subject", message } = req.body;

// //   if (!name || !email || !message) {
// //     return res.status(400).json({
// //       success: false,
// //       error: "Please fill all required fields carefully.",
// //     });
// //   }

// //   try {
// //     // Save to MongoDB
// //     const newContact = new Contact({ name, email, subject, message });
// //     await newContact.save();

// //     // Table-formatted HTML email
// //    const emailHtml = `
// //   <div style="font-family: Arial, sans-serif; color: #333; max-width: 650px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
// //     <!-- Header -->
// //     <div style="background-color: #004aad; color: #fff; padding: 15px 20px; text-align: center;">
// //       <h2 style="margin: 0; font-size: 22px;">New Contact Form Submission</h2>
// //     </div>

// //     <!-- Body -->
// //     <div style="padding: 20px; background-color: #f9f9f9;">
// //       <p style="font-size: 14px; margin-bottom: 20px; text-align: center;">
// //         You have received a new message from your website contact form
// //       </p>

// //       <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
// //         <tr>
// //           <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Name</td>
// //           <td style="padding: 10px; border: 1px solid #ccc;">${name}</td>
// //         </tr>
// //         <tr>
// //           <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Email</td>
// //           <td style="padding: 10px; border: 1px solid #ccc;">${email}</td>
// //         </tr>
// //         <tr>
// //           <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Subject</td>
// //           <td style="padding: 10px; border: 1px solid #ccc;">${subject || "-"}</td>
// //         </tr>
// //         <tr>
// //           <td style="padding: 10px; font-weight: bold; background-color: #e8f0fe; border: 1px solid #ccc;">Message</td>
// //           <td style="padding: 10px; border: 1px solid #ccc; white-space: pre-wrap;">${message}</td>
// //         </tr>
// //       </table>
      
// //     </div>

// //     <!-- Footer -->
// //     <div style="background-color: #f1f1f1; padding: 10px 20px; text-align: center; font-size: 12px; color: #777;">
// //       Kishtwar Gold &copy; ${new Date().getFullYear()}
// //     </div>
// //   </div>
// // `;


// //     // Send email
// //     await sendMail({
// //       to: process.env.ZOHO_EMAIL,
// //       subject: `New Contact Form Submission from ${name}`,
// //       text: `You have a new contact form submission from ${name} (${email}). Subject: ${subject}. Message: ${message}`,
// //       html: emailHtml,
// //     });

// //     return res.status(201).json({
// //       success: true,
// //       message: "Contact form submitted successfully!",
// //       data: newContact,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error in contact POST:", error);
// //     return res.status(500).json({
// //       success: false,
// //       error: error.message || "Server error. Please try again later.",
// //     });
// //   }
// // });

// // // GET: optional test route or fetch all messages
// // router.get("/", async (req, res) => {
// //   try {
// //     const contacts = await Contact.find().sort({ createdAt: -1 });
// //     return res.status(200).json({ success: true, data: contacts });
// //   } catch (error) {
// //     console.error("❌ Error fetching contacts:", error);
// //     return res.status(500).json({
// //       success: false,
// //       error: "Server error. Please try again later.",
// //     });
// //   }
// // });

// // export default router;



// import express from "express";
// import Contact from "../models/Contact.js";
// import { sendMail } from "../utils/mailer.js";

// const router = express.Router();

// // POST route: Save + send email
// router.post("/", async (req, res) => {
//   const { name, email, subject = "", message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ success: false, error: "All fields are required." });
//   }

//   try {
//     // Save in MongoDB
//     const newContact = new Contact({ name, email, subject, message });
//     await newContact.save();

//     // Send professional email
//     await sendMail({
//       to: process.env.ZOHO_EMAIL,
//       subject: `New Contact Form Submission from ${name}`,
//       text: `Message from ${name} (${email}): ${message}`,
//       html: `
//       <div style="font-family:sans-serif; padding:20px; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:5px;">
//         <h2 style="text-align:center; color:#333;">New Contact Form Submission</h2>
//         <table style="width:100%; border-collapse:collapse; margin-top:20px;">
//           <tr><td style="padding:8px; border:1px solid #ddd;"><b>Name</b></td><td style="padding:8px; border:1px solid #ddd;">${name}</td></tr>
//           <tr><td style="padding:8px; border:1px solid #ddd;"><b>Email</b></td><td style="padding:8px; border:1px solid #ddd;">${email}</td></tr>
//           <tr><td style="padding:8px; border:1px solid #ddd;"><b>Subject</b></td><td style="padding:8px; border:1px solid #ddd;">${subject}</td></tr>
//           <tr><td style="padding:8px; border:1px solid #ddd;"><b>Message</b></td><td style="padding:8px; border:1px solid #ddd;">${message}</td></tr>
//         </table>
//         <p style="text-align:center; color:#555; margin-top:20px;">Automated notification from Kishtwar Gold Website</p>
//       </div>
//       `,
//     });

//     return res.status(201).json({ success: true, message: "Form submitted successfully!", data: newContact });
//   } catch (error) {
//     console.error("❌ Contact POST error:", error);
//     return res.status(500).json({ success: false, error: error.message || "Server error." });
//   }
// });

// // GET route: test/admin
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



import express from "express";
import Contact from "../models/Contact.js";
import { sendMail } from "../utils/mailer.js";

const router = express.Router();

// POST: Save contact + send email
router.post("/", async (req, res) => {
  const { name, email, subject = "", message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  try {
    // 1️⃣ Save in DB
    const newContact = await Contact.create({ name, email, subject, message });

    // 2️⃣ Send email
    const emailHtml = `
      <div style="font-family:sans-serif; padding:20px; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:5px;">
        <h2 style="text-align:center; color:#333;">New Contact Form Submission</h2>
        <table style="width:100%; border-collapse:collapse; margin-top:20px;">
          <tr><td style="padding:8px; border:1px solid #ddd;"><b>Name</b></td><td style="padding:8px; border:1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;"><b>Email</b></td><td style="padding:8px; border:1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;"><b>Subject</b></td><td style="padding:8px; border:1px solid #ddd;">${subject}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd;"><b>Message</b></td><td style="padding:8px; border:1px solid #ddd;">${message}</td></tr>
        </table>
      </div>
    `;

    await sendMail({
      to: process.env.ZOHO_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `Message from ${name} (${email}): ${message}`,
      html: emailHtml,
    });

    // 3️⃣ Send response to frontend
    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully!",
      data: newContact,
    });
  } catch (error) {
    console.error("❌ Contact POST error:", error);
    return res.status(500).json({ success: false, error: error.message || "Server error." });
  }
});

// GET: optional test or fetch all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("❌ Contact GET error:", error);
    return res.status(500).json({ success: false, error: "Server error." });
  }
});

export default router;
