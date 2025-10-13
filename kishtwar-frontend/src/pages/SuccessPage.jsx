import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "Form submitted successfully!";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <CheckCircle size={100} color="#4BB543" />
      <h2 style={{ marginTop: "20px", color: "#333" }}>{message}</h2>
      <button
        style={{
          marginTop: "30px",
          background: "#4BB543",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default SuccessPage;
