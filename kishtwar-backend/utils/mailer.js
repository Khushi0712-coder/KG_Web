import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_APP_PASSWORD) {
  throw new Error("ZOHO_EMAIL and ZOHO_APP_PASSWORD must be defined in .env");
}

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,           // 465 for secure SSL, 587 for TLS
  secure: true,    
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD, // Zoho App Password recommended
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Nodemailer connection error:", err);
  } else {
    console.log("✅ Nodemailer is ready to send emails");
  }
});