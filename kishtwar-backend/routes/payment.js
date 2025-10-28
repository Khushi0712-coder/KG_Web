// // routes/payment.js
// import express from "express";
// import { createOrder, verifyOrder } from "../utils/cashfree.js";

// const router = express.Router();

// // =====================
// // Create Payment Order
// // =====================
// router.post("/create", async (req, res) => {
//   try {
//     let { amount, customer } = req.body;

//     // Convert string amount to number if necessary
//     amount = Number(amount);
//     if (isNaN(amount) || amount <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Amount is required and must be a positive number",
//       });
//     }

//     // Validate customer object
//     if (
//       !customer ||
//       !customer.customer_name ||
//       !customer.customer_email ||
//       !customer.customer_phone
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer details (name, email, phone) are required",
//       });
//     }

//     // Generate unique order ID
//     const orderId = "KG_" + Date.now();

//     console.log("Creating payment order:", { orderId, amount, customer });

//     // Call Cashfree createOrder function
//     const data = await createOrder({ orderId, amount, customer });

//     console.log("Cashfree createOrder response:", data);

//     // Check Cashfree response
//     if (!data || !data.payment_session_id) {
//       console.error("Cashfree response invalid:", data);
//       return res.status(500).json({
//         success: false,
//         message: "Payment creation failed: Invalid response from Cashfree",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       orderId,
//       paymentSessionId: data.payment_session_id,
//     });
//   } catch (err) {
//     console.error("Cashfree Create Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Payment creation failed",
//       error: err.message || err,
//     });
//   }
// });

// // =====================
// // Verify Payment Order
// // =====================
// router.post("/verify", async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     if (!orderId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "orderId is required" });
//     }

//     console.log("Verifying payment order:", orderId);

//     const data = await verifyOrder(orderId);

//     console.log("Cashfree verifyOrder response:", data);

//     if (!data || !data.order_status) {
//       return res.status(500).json({
//         success: false,
//         message: "Verification failed: Invalid response from Cashfree",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       status: data.order_status,
//     });
//   } catch (err) {
//     console.error("Cashfree Verify Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Verification failed",
//       error: err.message || err,
//     });
//   }
// });

// export default router;




// routes/payment.js
import express from "express";
import dotenv from "dotenv";
import CashfreePG from "cashfree-pg";

dotenv.config();
const router = express.Router();

// =====================
// Initialize Cashfree (Production)
// =====================
const cf = new CashfreePG({
  env: process.env.CASHFREE_ENV,          // 'PROD'
  clientId: process.env.CASHFREE_APP_ID,
  clientSecret: process.env.CASHFREE_SECRET_KEY,
});

// =====================
// Create Payment Order
// =====================
router.post("/create", async (req, res) => {
  try {
    let { amount, customer } = req.body;

    // Validate amount
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount is required and must be a positive number",
      });
    }

    // Validate customer details
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

    // Prepare payload
    const payload = {
      order_amount: Number(amount.toFixed(2)),
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customer.customer_id || "CU_" + Date.now(),
        customer_name: customer.customer_name,
        customer_email: customer.customer_email,
        customer_phone: customer.customer_phone,
      },
      order_meta: {
        return_url: `${process.env.LIVE_FRONTEND}/payment-status?order_id=${orderId}`,
      },
    };

    console.log("Creating Cashfree order:", payload);

    // Call Cashfree API
    const response = await cf.PGCreateOrder(payload);

    console.log("Cashfree response:", response.data);

    if (!response || !response.data?.payment_session_id) {
      return res.status(500).json({
        success: false,
        message: "Payment creation failed: Invalid response from Cashfree",
      });
    }

    return res.status(200).json({
      success: true,
      orderId,
      paymentSessionId: response.data.payment_session_id,
    });
  } catch (err) {
    console.error("Cashfree Create Error:", err.response?.data || err.message || err);
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

    console.log("Verifying Cashfree order:", orderId);

    const response = await cf.PGFetchOrder(orderId);

    console.log("Cashfree verify response:", response.data);

    if (!response || !response.data?.order_status) {
      return res.status(500).json({
        success: false,
        message: "Verification failed: Invalid response from Cashfree",
      });
    }

    return res.status(200).json({
      success: true,
      status: response.data.order_status, // e.g., 'PAID', 'FAILED', 'PENDING'
    });
  } catch (err) {
    console.error("Cashfree Verify Error:", err.response?.data || err.message || err);
    return res.status(500).json({
      success: false,
      message: "Verification failed",
      error: err.message || err,
    });
  }
});

export default router;
