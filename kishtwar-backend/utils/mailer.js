// // utils/mailer.js
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: process.env.ZOHO_SMTP_HOST,
//   port: Number(process.env.ZOHO_SMTP_PORT),
//   secure: true, // SSL
//   auth: {
//     user: process.env.ZOHO_EMAIL,
//     pass: process.env.ZOHO_APP_PASSWORD,
//   },
//   tls: { rejectUnauthorized: false }, // Important to avoid connection issues
// });

// export const sendMail = async ({ to, subject, text, html }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Kishtwar Gold" <${process.env.ZOHO_EMAIL}>`,
//       to,
//       subject,
//       text,
//       html,
//     });
//     console.log("✅ Email sent:", info.messageId);
//   } catch (error) {
//     console.error("❌ Email error:", error);
//     throw error;
//   }
// };


import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ----------------------------
// 1️⃣ Zoho TLS Transporter
// ----------------------------
const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.com",
  port: Number(process.env.ZOHO_SMTP_PORT) || 587, // TLS port
  secure: false, // TLS
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
  tls: { rejectUnauthorized: false }, // Avoid SSL certificate issues
});

// ----------------------------
// 2️⃣ Optional: SendGrid fallback (Recommended for production reliability)
// ----------------------------
// Uncomment this section if Zoho fails in production
/*
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // literal 'apikey' for SendGrid
    pass: process.env.SENDGRID_API_KEY,
  },
});
*/

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Kishtwar Gold" <${process.env.ZOHO_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email error:", error);
    throw error;
  }
};
