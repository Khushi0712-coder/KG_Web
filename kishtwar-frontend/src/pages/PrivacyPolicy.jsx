import React from "react";
import "../components/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  const sections = [
    { id: "info-collect", title: "Information We Collect" },
    { id: "use-info", title: "How We Use Your Information" },
    { id: "data-protection", title: "Data Protection" },
    // { id: "cookies", title: "Cookies" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <div className="privacy-wrapper">
      {/* Header */}
      <header className="privacy-header">
        {/* <button onClick={() => window.history.back()} className="back-btn">
          ← Back
        </button> */}
        <div className="header-text">
          <h1>Privacy Policy</h1>
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
          <section id="info-collect" className="privacy-section">
            <h1>Information We Collect</h1>
            <p>
              • Name, email address, phone number, shipping address. <br />
              • Payment information (processed securely via payment gateways; we do
              not store card details). <br />
              • Browsing data (cookies, analytics, device info).
            </p>
          </section>

          <section id="use-info" className="privacy-section">
            <h1>How We Use Your Information</h1>
            <p>
              • To process and deliver your orders. <br />
              • To communicate updates, offers, and customer support. <br />
              • To improve website experience and services.
            </p>
          </section>

          <section id="data-protection" className="privacy-section">
            <h1> Data Protection</h1>
            <p>
              • We use secure servers and SSL encryption. <br />
              • Payment details are processed by trusted third-party gateways. <br />
              • We never sell or share your personal data with unauthorized parties.
            </p>
          </section>

          {/* <section id="cookies" className="privacy-section">
            <h1> Cookies</h1>
            <p>
              Our website uses cookies to improve functionality and user experience.
              You may disable cookies in your browser settings.
            </p>
          </section> */}

          <section id="contact" className="privacy-section">
            <h1> Contact Us</h1>
            <p>
              For any privacy concerns, write to us at: <br />
              📧{" "}
              <a href="mailto:support@kishtwargold.com">
                support@kishtwargold.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
