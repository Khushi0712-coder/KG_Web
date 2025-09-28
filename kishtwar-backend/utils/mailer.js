import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Check environment variables
if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_APP_PASSWORD) {
  throw new Error("❌ ZOHO_EMAIL and ZOHO_APP_PASSWORD must be defined in .env");
}

// Create transporter
export const mailTransporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,          // SSL port
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD, // Use Zoho App Password
  },
});

// Verify connection (only for startup / debugging)
mailTransporter.verify((err, success) => {
  if (err) {
    console.error("❌ Nodemailer connection error:", err);
  } else {
    console.log("✅ Nodemailer is ready to send emails");
  }
});
