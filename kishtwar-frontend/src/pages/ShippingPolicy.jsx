import React from "react";
import "../components/ShippingPolicy.css"; // reuse same CSS

export default function ShippingPolicy() {
  const sections = [
    { id: "processing-time", title: "Processing Time" },
    { id: "shipping-partners", title: "Shipping Partners" },
    { id: "delivery-timelines", title: "Delivery Timelines" },
    { id: "shipping-charges", title: "Shipping Charges" },
    { id: "tracking", title: "Tracking" },
  ];

  return (
    <div className="privacy-wrapper">
      {/* Header */}
      <header className="privacy-header">
        {/* <button onClick={() => window.history.back()} className="back-btn">
          ← Back
        </button> */}
        <div className="header-text">
          <h1>Shipping Policy</h1>
        </div>
      </header>

      {/* Layout */}
      <main className="privacy-layout">
        {/* Sidebar */}
        <aside className="privacy-sidebar">
          <h2>Table of Contents</h2>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="privacy-content">
          <section id="processing-time" className="privacy-section">
            <h1>Processing Time</h1>
            <p>
              Orders are processed and dispatched within 2–4 business days.
            </p>
          </section>

          <section id="shipping-partners" className="privacy-section">
            <h1>Shipping Partners</h1>
            <p>
              We use trusted courier services (Blue Dart, Delhivery, India Post, etc.).
            </p>
          </section>

          <section id="delivery-timelines" className="privacy-section">
            <h1>Delivery Timelines</h1>
            <p>
              •  Metro Cities (India): 3–5 working days <br />
              •  Other Indian Regions: 5–7 working days <br />
              •  International Orders: 10–20 working days
            </p>
          </section>

          <section id="shipping-charges" className="privacy-section">
            <h1>Shipping Charges</h1>
            <p>
              • Free shipping for orders above ₹1,000 in India. <br />
              • Nominal charges apply for smaller orders & international shipping.
            </p>
          </section>

          <section id="tracking" className="privacy-section">
            <h1>Tracking</h1>
            <p>
              Customers receive tracking details via email/SMS once the order is shipped.
            </p>
          </section>
          <br /><br />
        </div>
      </main>
    </div>
  );
}
