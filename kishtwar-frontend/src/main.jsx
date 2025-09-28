import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap import
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Bootstrap JS for navbar toggle
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
