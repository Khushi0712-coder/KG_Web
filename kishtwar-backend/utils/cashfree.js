// import dotenv from "dotenv";
// dotenv.config();

// import * as Cashfree from "cashfree-pg"; // Import all as Cashfree

// // Set environment mode
// const envMode =
//   process.env.CASHFREE_ENV === "PROD" ? Cashfree.PRODUCTION : Cashfree.SANDBOX;

// // Create Cashfree instance
// const cf = new Cashfree.Cashfree(
//   envMode,
//   process.env.CASHFREE_APP_ID,
//   process.env.CASHFREE_SECRET_KEY
// );

// // Function to create payment order
// export async function createOrder({ orderId, amount, customer }) {
//   try {
//     const payload = {
//       order_amount: Number(amount), // ensure numeric
//       order_currency: "INR",
//       order_id: orderId,
//       customer_details: {
//         customer_id: customer.customer_id || "CU_" + Date.now(),
//         customer_name: customer.customer_name,
//         customer_email: customer.customer_email,
//         customer_phone: customer.customer_phone,
//       },
//       order_meta: {
//         return_url: `${process.env.FRONTEND_URL}/payment-status?order_id=${orderId}`,
//       },
//     };

//     console.log("Cashfree createOrder payload:", payload);

//     const response = await cf.PGCreateOrder(payload);

//     console.log("Cashfree response:", response.data);

//     return response.data;
//   } catch (err) {
//     console.error(
//       "Cashfree API Error:",
//       err.response?.data || err.message || err
//     );
//     throw err;
//   }
// }

// // Function to verify payment order
// export async function verifyOrder(orderId) {
//   try {
//     const response = await cf.PGFetchOrder(orderId);
//     console.log("Cashfree verify response:", response.data);
//     return response.data;
//   } catch (err) {
//     console.error(
//       "Cashfree Verify Error:",
//       err.response?.data || err.message || err
//     );
//     throw err;
//   }
// }





import dotenv from "dotenv";
dotenv.config();

import * as Cashfree from "cashfree-pg";

// Determine environment mode
const envMode =
  process.env.CASHFREE_ENV?.toUpperCase() === "PROD"
    ? Cashfree.PRODUCTION
    : Cashfree.SANDBOX;

// Initialize Cashfree
const cf = new Cashfree.Cashfree(
  envMode,
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

// ---------------------------
// CREATE ORDER FUNCTION
// ---------------------------
export async function createOrder({ orderId, amount, customer }) {
  try {
    const payload = {
      order_amount: Number(amount),
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

    // Log only in dev mode
    if (process.env.CASHFREE_ENV !== "PROD") {
      console.log("Cashfree createOrder payload:", payload);
    }

    const response = await cf.PGCreateOrder(payload);

    console.log("Cashfree response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Cashfree API Error:", err.response?.data || err.message);
    throw err;
  }
}

// ---------------------------
// VERIFY ORDER FUNCTION
// ---------------------------
export async function verifyOrder(orderId) {
  try {
    const response = await cf.PGFetchOrder(orderId);
    console.log("Cashfree verify response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Cashfree Verify Error:", err.response?.data || err.message);
    throw err;
  }
}
