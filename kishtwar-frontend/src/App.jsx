// src/App.jsx
import React, { useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Pages import
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

// ✅ Scroll-to-top on route change (professional way)
function ScrollToTopWrapper({ children }) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Instantly scroll to top without flicker
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto" // instant scroll
    });
  }, [pathname]);

  return children;
}

function AppContent() {
  const location = useLocation(); // ✅ use to check current route

  // ✅ Hide Navbar and Footer on Privacy, Terms, and Shipping pages
  const hideNavFooter = [
    "/privacy-policy",
    "/terms-of-service",
    "/shipping-policy"
  ].includes(location.pathname);

  return (
    <>
      {/* Navbar hidden on specified pages */}
      {!hideNavFooter && <Navbar />}

      <main className="content">
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
        </Routes>
      </main>

      {/* Footer hidden on Cart AND specified pages */}
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