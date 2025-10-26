// utils/cashfree.js
import dotenv from "dotenv";
dotenv.config();

import * as Cashfree from "cashfree-pg"; // Import all as Cashfree

// Set environment mode
const envMode = process.env.CASHFREE_ENV === "PROD" ? Cashfree.PRODUCTION : Cashfree.SANDBOX;

// Create Cashfree instance
const cf = new Cashfree.Cashfree(envMode, process.env.CASHFREE_APP_ID, process.env.CASHFREE_SECRET_KEY);

// Function to create payment order
export async function createOrder({ orderId, amount, customer }) {
  const payload = {
    order_amount: amount,
    order_currency: "INR",
    order_id: orderId,
    customer_details: {
      customer_id: customer.id,
      customer_email: customer.email,
      customer_phone: customer.phone,
    },
    order_meta: {
      return_url: `${process.env.FRONTEND_URL}/payment-status?order_id=${orderId}`,
    },
  };

  const response = await cf.PGCreateOrder(payload);
  return response.data;
}

// Function to verify payment order
export async function verifyOrder(orderId) {
  const response = await cf.PGFetchOrder(orderId);
  return response.data;
}
