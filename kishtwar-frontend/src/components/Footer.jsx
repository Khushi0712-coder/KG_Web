import React, { useState, useEffect } from "react";
import "./Footer.css";
import logo from "../assets/logo.png"; // update path if needed

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll button
  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    handleResize(); // run initially
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - Brand */}
        <div className="footer-col">
          <div className="footer-brand d-flex align-items-center mb-2">
            <div className="footer-logo-circle me-2">
              <img src={logo} alt="Logo" />
            </div>
            <div>
              <h2>KISHTWAR BLOOM</h2>
              <p className="tagline">A FARMER&apos;S BRAND</p>
            </div>
          </div>
          <p className="footer-text">
            From the pristine valleys of Kishtwar, bringing you the world&apos;s
            finest GI-tagged saffron. Pure, authentic, and handpicked for excellence.
          </p>
          <div className="social-icons">
            <a href="https://www.instagram.com/kishtwar_gold/" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
            </a>
            <a href="https://www.youtube.com/@PureKishtwarSaffron" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" />
            </a>
            <a href="https://wa.me/+918169045778" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" />
            </a>
            <a href="https://www.linkedin.com/company/kishtwar-gold" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-col">
          <h3
            className="footer-heading"
            onClick={() => isMobile && toggleSection("quick")}
          >
            Quick Links{" "}
            {isMobile && (
              <i
                className={`fa-solid fa-chevron-${
                  openSection === "quick" ? "up" : "down"
                }`}
              ></i>
            )}
          </h3>
          <ul
            className={`footer-links ${
              !isMobile || openSection === "quick" ? "open" : ""
            }`}
          >
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/review">Reviews</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 - Products */}
        <div className="footer-col">
          <h3
            className="footer-heading"
            onClick={() => isMobile && toggleSection("products")}
          >
            Products{" "}
            {isMobile && (
              <i
                className={`fa-solid fa-chevron-${
                  openSection === "products" ? "up" : "down"
                }`}
              ></i>
            )}
          </h3>
          <ul
            className={`footer-links ${
              !isMobile || openSection === "products" ? "open" : ""
            }`}
          >
            <li><a href="/products">Premium Saffron</a></li>
            <li><a href="/products">Gift Boxes</a></li>
            <li><a href="/products">Exclusive Collection</a></li>
            <li><a href="/cart">Shopping Cart</a></li>
          </ul>
        </div>

        {/* Column 4 - Contact Info */}
        <div className="footer-col">
          <h3
            className="footer-heading"
            onClick={() => isMobile && toggleSection("contact")}
          >
            Contact Info{" "}
            {isMobile && (
              <i
                className={`fa-solid fa-chevron-${
                  openSection === "contact" ? "up" : "down"
                }`}
              ></i>
            )}
          </h3>
          <div
            className={`footer-links ${
              !isMobile || openSection === "contact" ? "open" : ""
            }`}
          >
            <p><i className="fa-solid fa-location-dot"></i> Kishtwar, Jammu & Kashmir, India</p>
            <p><i className="fa-solid fa-phone"></i> +91 81690 45778</p>
            <p><i className="fa-solid fa-envelope"></i> <a href="mailto:support@kishtwargold.com">support@kishtwargold.com</a></p>
            <p><i className="fa-solid fa-clock"></i> Mon - Sat: 9:00 AM - 7:00 PM</p>

            <h4 className="newsletter-heading">Newsletter</h4>
            <div className="input-group">
              <input type="email" placeholder="Your email" />
              <button><i className="fa-solid fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="footer-bottom">
        <p>© 2025 Kishtwar Bloom. All rights reserved.</p>
        <div className="footer-policies">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/shipping-policy">Shipping Policy</a>
        </div>
      </div>

      {/* Scroll To Top */}
      {showScroll && (
        <button className="scroll-top" onClick={scrollToTop}>
          <i className="fa-solid fa-arrow-up" style={{ color: 'white' }}></i>
        </button>
      )}
    </footer>
  );
};

export default Footer;
