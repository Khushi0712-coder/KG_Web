// models/Contact.js
import mongoose from "mongoose";

// ✅ Contact Schema define kar rahe hain
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // ✅ automatically createdAt & updatedAt add karega
  }
);

// ✅ Mongoose Model banana (export default se)
const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
