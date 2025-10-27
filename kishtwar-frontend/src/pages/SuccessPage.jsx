import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message =
    location.state?.message || "Your form has been submitted successfully!";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0fdf4",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* CheckCircle Icon */}
      <CheckCircle
        style={{
          width: "100px",
          height: "100px",
          color: "green",
          marginBottom: "20px",
          animation: "scaleUp 0.5s ease-out",
        }}
      />

      <h1 style={{ fontSize: "36px", marginBottom: "10px", color: "#166534" }}>
        Success!
      </h1>
      <p style={{ fontSize: "18px", color: "#14532d", marginBottom: "30px" }}>
        {message}
      </p>
      <button
        onClick={() => navigate("/")} // Go to Home
        style={{
          padding: "12px 30px",
          fontSize: "16px",
          backgroundColor: "green",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#166534")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "green")}
      >
        Go Home
      </button>

      {/* CSS Animation */}
      <style>{`
        @keyframes scaleUp {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
