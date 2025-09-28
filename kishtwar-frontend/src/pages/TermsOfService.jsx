// src/pages/TermsOfService.jsx
import React from "react";
import "../components/TermsofService.css";

export default function TermsOfService() {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "products", title: "Products" },
    { id: "orders-payments", title: "Orders & Payments" },
    { id: "shipping-delivery", title: "Shipping & Delivery" },
    { id: "returns-refunds", title: "Returns & Refunds" },
    { id: "liability", title: "Limitation of Liability" },
  ];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 120;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="privacy-wrapper">
      {/* Header */}
      <header className="privacy-header sticky-top border-bottom">
        <div className="container position-relative py-3">
          {/* Back Button */}
          {/* <button
  onClick={() => window.history.back()}
  className="back-btn position-absolute start-0 top-50 translate-middle-y"
>
  ← Back
</button> */}
          {/* Centered Title */}
          <h1 className="m-0 text-center">Terms of Service</h1>
        </div>
      </header>

      {/* Layout */}
      <main className="privacy-layout">
        {/* Sidebar / Table of Contents */}
        <aside className="privacy-sidebar">
          <h2>Table of Contents</h2>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <button className="toc-link" onClick={() => handleScroll(s.id)}>
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="privacy-content">
          <section id="introduction" className="privacy-section">
            <h1>Introduction</h1>
            <p>By accessing <a href="https://kishtwargold.com">kishtwargold.com</a>, you agree to our terms and policies.</p>
          </section>

          <section id="products" className="privacy-section">
            <h1>Products</h1>
            <p>
             •  We sell 100% pure Kishtwari saffron. <br />
             •  Product images may slightly differ due to natural variations.
            </p>
          </section>

          <section id="orders-payments" className="privacy-section">
            <h1>Orders & Payments</h1>
            <p>
              • Orders are confirmed only after successful payment. <br />
              • Prices are listed in INR and are subject to change without notice. <br />
              • We reserve the right to cancel suspicious or bulk orders.
            </p>
          </section>

          <section id="shipping-delivery" className="privacy-section">
            <h1>Shipping & Delivery</h1>
            <p>
              • Orders are shipped within 2–4 business days. <br />
              • Delivery timelines: 5–7 working days (India); International timelines vary.
            </p>
          </section>

          <section id="returns-refunds" className="privacy-section">
            <h1>Returns & Refunds</h1>
            <p>
              • Returns accepted only if product is damaged, tampered, or incorrect. <br />
              • Request must be raised within 48 hours of delivery with proof (photo/video). <br />
              • Refunds processed within 7–10 business days after approval.
            </p>
          </section>

          <section id="liability" className="privacy-section">
            <h1>Limitation of Liability</h1>
            <p>
              We are not responsible for delays due to courier partners, natural events, or incorrect address provided by customers.
            </p>
          </section>
          <br /><br />
        </div>
      </main>
    </div>
  );
}
