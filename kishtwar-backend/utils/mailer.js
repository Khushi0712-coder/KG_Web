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

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST,
  port: Number(process.env.ZOHO_SMTP_PORT) || 587, // TLS
  secure: false, // use TLS
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // allow cloud connections
  },
});

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
