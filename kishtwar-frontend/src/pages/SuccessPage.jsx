import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("Verifying...");
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) return;

      const res = await fetch("http://localhost:5000/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderStatus(data.status);
      } else {
        setOrderStatus("Verification Failed");
      }
    };

    verifyPayment();
  }, [orderId]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#111", color: "#fff" }}
    >
      <div
        className="text-center p-5 rounded shadow"
        style={{ background: "#1b1b1b", border: "1px solid #e6a100" }}
      >
        <h1 style={{ color: "#e6a100", fontWeight: "bold" }}>🎉 Payment Successful!</h1>

        <p className="mt-3 mb-1">
          <b>Order ID:</b> {orderId}
        </p>

        <p className="mb-4">
          <b>Status:</b> {orderStatus}
        </p>

        <button
          className="btn btn-outline-warning px-4"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
