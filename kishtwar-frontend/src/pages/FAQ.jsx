import React, { useState } from "react";
import "../components/FAQ.css"; // ✅ your CSS file
import aboutImg from "../assets/Saffron.png";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How to identify pure saffron?",
      answer:
        "Pure saffron has a deep red color, unique aroma, and releases golden-yellow color when soaked in water or milk.",
    },
    {
      question: "How to store saffron properly?",
      answer:
        "Store saffron in an airtight container, away from light and moisture, to maintain its quality.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship internationally with reliable courier partners ensuring safe delivery.",
    },
    {
      question: "What makes Kishtwar saffron special?",
      answer:
        "Kishtwar saffron is known for its strong aroma, high coloring strength, and unmatched purity.",
    },
    {
      question: "How much saffron should I use in cooking?",
      answer:
        "Usually, a few strands are enough to add aroma and color to dishes.",
    },
  ];

  return (
    <>
      {/* ✅ Hero Section */}
      <section
        className="about-hero text-white"
        style={{
          background: `url(${aboutImg}) no-repeat center center/cover`,
        }}
      >
        <div className="overlay"></div>
        <div className="container text-center hero-content">
          <h1 className="main-title">Frequently Asked Questions</h1>
          <h3 className="sub-title">
            Everything you need to know about our premium saffron
          </h3>
        </div>
      </section>

      {/* ✅ FAQ Section */}
      <section className="faq-section py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">
            Frequently Asked Questions
          </h2>

          <div className="accordion">
            {faqData.map((faq, index) => (
              <div
                className={`accordion-item ${
                  activeIndex === index ? "active" : ""
                }`}
                key={index}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  <span className={`arrow ${activeIndex === index ? "open" : ""}`}>
                    
                  </span>
                </button>

                {activeIndex === index && (
                  <div className="accordion-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Contact Section */}
      <section className="contact-section py-5">
        <div className="contact-card text-center p-4 shadow rounded-4">
          <h2 className="fw-bold">Still Have Questions?</h2>
          <p className="text-muted mb-4">
            Our customer support team is here to help you with any additional
            questions about our saffron products.
          </p>

          <div className="contact-buttons d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/contact" className="btn-contact">
              CONTACT US
            </Link>
            <Link to="/about" className="btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
