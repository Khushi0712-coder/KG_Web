import Cashfree from "cashfree-sdk";

const { CASHFREE_APP_ID, CASHFREE_SECRET_KEY, CASHFREE_ENV } = process.env;

if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
  throw new Error("❌ Cashfree API credentials missing in .env");
}

export const cashfree = new Cashfree({
  appId: CASHFREE_APP_ID,
  secretKey: CASHFREE_SECRET_KEY,
  env: CASHFREE_ENV === "PROD" ? "PROD" : "TEST",
});

console.log(`💰 Cashfree initialized in ${CASHFREE_ENV} mode`);
