import React, { useState } from "react";
import "../components/Contact.css";
import aboutImg from "../assets/Saffron.png";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section
        className="about-hero text-white"
        style={{
          background: `url(${aboutImg}) no-repeat center center/cover`,
        }}
      >
        <div className="overlay"></div>
        <div className="container text-center hero-content">
          <h1 className="main-title">Get In Touch</h1>
          <h3 className="sub-title">
            We'd love to hear from you and help with your saffron needs
          </h3>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row contact-row g-4">
            {/* Contact Form */}
            <div className="col-lg-8 d-flex">
              <div className="card p-4 flex-fill">
                <h3 className="text-center text-warning mb-3 section-heading">
                  Send Us a Message
                </h3>
                <p className="text-muted text-center section-subheading mb-4">
                  Have questions about our saffron? Want to place a bulk order?
                  We're here to help!
                </p>
                <form
                  className="d-flex flex-column h-100"
                  action="https://getform.io/f/bolzrmna"
                  method="POST"
                >
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        className="form-control"
                        placeholder="Enter your full name"
                        required // 👈 yeh add karo
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="your@email.com"
                        required // 👈 yeh bhi
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="form-label fw-semibold">Subject</label>
                    <select className="form-select" required name="subject">
                      {" "}
                      {/* 👈 yeh bhi */}
                      <option value="">Select a subject</option>
                      <option value="order">Bulk Order</option>
                      <option value="inquiry">Product Inquiry</option>
                      <option value="support">Customer Support</option>
                    </select>
                  </div>

                  <div className="mt-3 flex-grow-1">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      className="form-control h-100"
                      name="message"
                      rows="5"
                      placeholder="How can we help you?"
                      required // 👈 yeh bhi
                    ></textarea>
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-warning">
                      <i className="bi bi-send me-2"></i> Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 d-flex">
              <div className="card p-4 flex-fill">
                {/* Mobile Toggle */}
                <button
                  className="btn btn-outline-light d-lg-none w-100 mb-3"
                  style={{
                    borderColor: "#fca311",
                    color: "#fca311",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Get in Touch {isOpen ? " " : " "}
                </button>

                {/* Desktop Heading */}
                <h4 className="fw-bold mb-3 d-none d-lg-block">Get in Touch</h4>

                <div className={`collapse d-lg-block ${isOpen ? "show" : ""}`}>
                  <div className="contact-info-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                      alt="Address"
                    />
                    <div>
                      <h5 className="fw-bold mb-1">Address</h5>
                      <p className="text-muted mb-0">
                        Kishtwar District <br />
                        Jammu & Kashmir, India 182204
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
                      alt="Phone"
                    />
                    <div>
                      <h5 className="fw-bold mb-1">Phone</h5>
                      <p className="text-muted mb-0">+91 81690 45778</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/281/281769.png"
                      alt="Email"
                    />
                    <div>
                      <h5 className="fw-bold mb-1">Email</h5>
                      <p className="text-muted mb-0">
                        support@kishtwargold.com
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/61/61112.png"
                      alt="Business Hours"
                    />
                    <div>
                      <h5 className="fw-bold mb-1">Business Hours</h5>
                      <p className="text-muted mb-0">
                        Mon - Sat: 9:00 AM - 7:00 PM IST <br /> Sunday: Closed
                      </p>
                    </div>
                  </div>

                  <h5 className="fw-bold mt-4 mb-3">Follow Us</h5>
                  <div className="d-flex gap-3 contact-social">
                    <a
                      href="https://www.instagram.com/kishtwar_gold/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                        alt="Instagram"
                        width="32"
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/@PureKishtwarSaffron"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                        alt="YouTube"
                        width="32"
                      />
                    </a>
                    <a
                      href="https://wa.me/+918169045778"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                        alt="WhatsApp"
                        width="32"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/kishtwar-gold"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                        alt="LinkedIn"
                        width="32"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-5 quick-contact-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Quick Contact Options</h2>
            <p className="text-muted">Choose the best way to reach us</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4 d-flex">
              <div className="card text-center p-4 flex-fill">
                <div className="icon-circle mx-auto mb-3">
                  <i className="bi bi-whatsapp"></i>
                </div>
                <h5 className="fw-bold">WhatsApp</h5>
                <p className="text-muted mt-2 flex-grow-1">
                  Get instant response on WhatsApp for quick queries and orders.
                </p>
                <a
                  href="https://wa.me/+918169045778"
                  className="btn btn-warning mt-auto"
                >
                  <i className="bi bi-whatsapp me-2"></i> Chat Now
                </a>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="card text-center p-4 flex-fill">
                <div className="icon-circle mx-auto mb-3">
                  <i className="bi bi-telephone"></i>
                </div>
                <h5 className="fw-bold">Phone Call</h5>
                <p className="text-muted mt-2 flex-grow-1">
                  Speak directly with our customer service team.
                </p>
                <a href="tel:+918169045778" className="btn btn-warning mt-auto">
                  <i className="bi bi-telephone me-2"></i> Call Now
                </a>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="card text-center p-4 flex-fill">
                <div className="icon-circle mx-auto mb-3">
                  <i className="bi bi-envelope"></i>
                </div>
                <h5 className="fw-bold">Email</h5>
                <p className="text-muted mt-2 flex-grow-1">
                  Send us detailed inquiries via email for comprehensive
                  responses.
                </p>
                <a
                  href="mailto:support@kishtwargold.com"
                  className="btn btn-warning mt-auto"
                >
                  <i className="bi bi-envelope me-2"></i> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section className="py-5 bg-light find-us-section">
        <div className="container text-center">
          <h2 className="mb-2">Find Us</h2>
          <p className="text-muted mb-4">
            Located in the beautiful valleys of Kishtwar
          </p>
          <div className="map-container mx-auto shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26273.41820933934!2d75.711!3d33.313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1a3dca1a05d2f%3A0x8a5f1f7f6405c1d9!2sKishtwar!5e0!3m2!1sen!2sin!4v1699012345678"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kishtwar Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
