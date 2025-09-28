// backend/config/cashfree.js
import Cashfree from "cashfree-sdk"; // or the package you installed

const { CASHFREE_APP_ID, CASHFREE_SECRET_KEY, CASHFREE_ENV } = process.env;

export const cashfree = new Cashfree({
  appId: CASHFREE_APP_ID,
  secretKey: CASHFREE_SECRET_KEY,
  env: CASHFREE_ENV === "PROD" ? "PROD" : "TEST",
});
