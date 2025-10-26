// routes/payment.js
import express from "express";
import { createOrder, verifyOrder } from "../utils/cashfree.js";

const router = express.Router();

// Create Payment Order
router.post("/create", async (req, res) => {
  try {
    const { amount, customer } = req.body;

    const orderId = "KG_" + Date.now(); // Unique order id

    const data = await createOrder({ orderId, amount, customer });

    return res.json({
      success: true,
      orderId,
      paymentSessionId: data.payment_session_id,
    });
  } catch (err) {
    console.error("Cashfree Create Error:", err);
    res.status(500).json({ success: false, message: "Payment creation failed" });
  }
});

// Verify Payment Order
router.post("/verify", async (req, res) => {
  try {
    const { orderId } = req.body;

    const data = await verifyOrder(orderId);

    return res.json({
      success: true,
      status: data.order_status,
    });
  } catch (err) {
    console.error("Cashfree Verify Error:", err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
});

export default router;  // <-- default export for ES modules
