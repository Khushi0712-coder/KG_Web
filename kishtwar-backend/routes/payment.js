// routes/payment.js
import express from "express";
import { createOrder, verifyOrder } from "../utils/cashfree.js";

const router = express.Router();

// =====================
// Create Payment Order
// =====================
router.post("/create", async (req, res) => {
  try {
    let { amount, customer } = req.body;

    // Convert string amount to number if necessary
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount is required and must be a positive number",
      });
    }

    // Validate customer object
    if (
      !customer ||
      !customer.customer_name ||
      !customer.customer_email ||
      !customer.customer_phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer details (name, email, phone) are required",
      });
    }

    // Generate unique order ID
    const orderId = "KG_" + Date.now();

    console.log("Creating payment order:", { orderId, amount, customer });

    // Call Cashfree createOrder function
    const data = await createOrder({ orderId, amount, customer });

    console.log("Cashfree createOrder response:", data);

    // Check Cashfree response
    if (!data || !data.payment_session_id) {
      console.error("Cashfree response invalid:", data);
      return res.status(500).json({
        success: false,
        message: "Payment creation failed: Invalid response from Cashfree",
      });
    }

    return res.status(200).json({
      success: true,
      orderId,
      paymentSessionId: data.payment_session_id,
    });
  } catch (err) {
    console.error("Cashfree Create Error:", err);
    return res.status(500).json({
      success: false,
      message: "Payment creation failed",
      error: err.message || err,
    });
  }
});

// =====================
// Verify Payment Order
// =====================
router.post("/verify", async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "orderId is required" });
    }

    console.log("Verifying payment order:", orderId);

    const data = await verifyOrder(orderId);

    console.log("Cashfree verifyOrder response:", data);

    if (!data || !data.order_status) {
      return res.status(500).json({
        success: false,
        message: "Verification failed: Invalid response from Cashfree",
      });
    }

    return res.status(200).json({
      success: true,
      status: data.order_status,
    });
  } catch (err) {
    console.error("Cashfree Verify Error:", err);
    return res.status(500).json({
      success: false,
      message: "Verification failed",
      error: err.message || err,
    });
  }
});

export default router;
