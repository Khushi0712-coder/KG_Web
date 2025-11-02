// src/App.jsx
import React, { useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Review from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ShippingPolicy from "./pages/ShippingPolicy";
import SuccessPage from "./pages/SuccessPage";

const HIDE_NAV_FOOTER_ROUTES = [
  "/privacy-policy",
  "/terms-of-service",
  "/shipping-policy",
  "/success", 
];

function ScrollToTopWrapper({ children }) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", 
    });
  }, [pathname]);

  return children;
}

function AppContent() {
  const location = useLocation();

  const hideNavFooter = HIDE_NAV_FOOTER_ROUTES.includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}

      <main className="content" style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/review" element={<Review />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/success" element={<SuccessPage />} />

          <Route
            path="*"
            element={
              <div
                style={{
                  textAlign: "center",
                  marginTop: "100px",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                }}
              >
                🚫 404 - Page Not Found <br />
                <a
                  href="/"
                  style={{
                    color: "#b97a56",
                    textDecoration: "underline",
                    display: "inline-block",
                    marginTop: "10px",
                  }}
                >
                  Go back to Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      {!hideNavFooter && location.pathname !== "/cart" && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTopWrapper>
        <AppContent />
      </ScrollToTopWrapper>
    </Router>
  );
}

export default App;
