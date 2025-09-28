// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "../components/Home.css";
// import heroImg from "../assets/Saffron.png";
// import saffron1 from "../assets/1st.jpeg";
// import saffron2 from "../assets/2nd.jpeg";
// import giftbox from "../assets/giftbox.jpeg";
// import mountain from "../assets/mountain.png";
// import Checkout from "./Checkout";

// const Home = () => {
//   const [showScroll, setShowScroll] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(null);

//   const [cart, setCart] = useState([]);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [checkoutStep, setCheckoutStep] = useState(1);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [popup, setPopup] = useState({ show: false, success: false, text: "" });

//   useEffect(() => {
//     const handleScroll = () => setShowScroll(window.scrollY > 300);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleAccordion = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const faqData = [
//     {
//       question: "How to identify pure saffron?",
//       answer:
//         "Pure saffron has a distinctive aroma, deep red color, and when soaked in water, it releases a golden yellow color slowly. Our Kishtwar saffron is GI-tagged and comes with authenticity certificates.",
//     },
//     {
//       question: "How to store saffron properly?",
//       answer:
//         "Store saffron in an airtight container away from direct sunlight and moisture to maintain its aroma and color for a long time.",
//     },
//     {
//       question: "Do you ship internationally?",
//       answer:
//         "Yes, we ship our saffron globally with proper packaging and certification to ensure freshness and authenticity upon delivery.",
//     },
//   ];

//   const nextStep = () => setCheckoutStep((prev) => Math.min(prev + 1, 3));
//   const prevStep = () => setCheckoutStep((prev) => Math.max(prev - 1, 1));

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.message) {
//       setPopup({
//         show: true,
//         success: false,
//         text: "All fields are required!",
//       });
//       setTimeout(
//         () => setPopup({ show: false, success: false, text: "" }),
//         3000
//       );
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/messages",
//         formData
//       );
//       if (res.data.success) {
//         setPopup({ show: true, success: true, text: res.data.message });
//         setFormData({ name: "", email: "", message: "" });
//       }
//     } catch (error) {
//       setPopup({
//         show: true,
//         success: false,
//         text: error.response?.data?.error || "Server error!",
//       });
//     }

//     setTimeout(() => setPopup({ show: false, success: false, text: "" }), 3000);
//   };

//   return (
//     <div className="page-wrapper">
//       {/* Hero Section */}
//       <section
//         className="hero text-white"
//         style={{ background: `url(${heroImg}) no-repeat center center/cover` }}
//       >
//         <div className="overlay"></div>
//         <div className="container text-center hero-content">
//           <span className="tagline-badge mb-3">GI TAGGED AUTHENTIC SAFFRON</span>
//           <h1 className="main-title">KISHTWAR GOLD</h1>
//           <h3 className="sub-title">The Pride of Pure Saffron</h3>
//           <p className="hero-text">
//             From the heart of Kishtwar, bringing purity and richness to your life.
//             <br />
//             Experience the world’s finest GI-tagged saffron, handpicked by master farmers.
//           </p>
//           <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
//             <Link to="/products" style={{ textDecoration: "none" }}>
//               <button className="cta-btn primary-btn">
//                 <i className="fas fa-bag-shopping"></i>SHOP NOW
//               </button>
//             </Link>
//             <button className="cta-btn outline-btn">
//               <i className="bi bi-crown me-2"></i>EXPLORE EXCLUSIVE COLLECTION
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Heritage Section */}
//       <section className="container py-5">
//         <div className="row align-items-center">
//           <div className="col-lg-6 mb-4">
//             <button className="highlight-btn mb-3">Our Legacy</button>
//             <h2 className="fw-bold" style={{ textAlign: "left" }}>
//               Saffron Heritage of Kishtwar
//             </h2>
//             <p className="text-muted mb-4">
//               Nestled in the pristine valleys of Kishtwar, our saffron fields
//               have been cultivating the world's most precious spice for generations.
//             </p>
//             <div className="row g-3 mb-4">
//               <div className="col-6 col-md-6">
//                 <div className="info-box">🌞 GI Tagged</div>
//               </div>
//               <div className="col-6 col-md-6">
//                 <div className="info-box">⚠️ High Altitude</div>
//               </div>
//               <div className="col-6 col-md-6">
//                 <div className="info-box">✋ Hand Picked</div>
//               </div>
//               <div className="col-6 col-md-6">
//                 <div className="info-box">🏅 Premium Grade</div>
//               </div>
//             </div>
//             <Link to="/about">
//               <button className="learn-btn">Learn More About Us</button>
//             </Link>
//           </div>
//           <div className="col-lg-6">
//             <div className="rounded-4 overflow-hidden shadow">
//               <img src={mountain} alt="Mountain valley" className="img-fluid w-100" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Section */}
//       <section className="products-section py-5">
//         <div className="container text-center">
//           <button className="badge-btn mb-3">Featured Collection</button>
//           <h2 className="fw-bold">Premium Saffron Selection</h2>
//           <p className="text-muted mb-5">
//             Discover our handpicked collection of premium saffron products, perfect for culinary excellence and gifting.
//           </p>

//           <div className="row g-4">
//             {[{ img: saffron1, title: "Premium Saffron 1g", price: "₹500", desc: "Handpicked premium Kishtwar saffron, 1 gram pack" },
//               { img: saffron2, title: "Premium Saffron 2g", price: "₹950", desc: "Handpicked premium Kishtwar saffron, 2 gram pack" },
//               { img: giftbox, title: "Premium Gift Box 5g", price: "₹2250", desc: "Luxury gift box with 5g premium saffron" }].map((product, index) => (
//               <div className="col-md-4" key={index}>
//                 <div className="card h-100 shadow-sm border-0 rounded-4">
//                   <img src={product.img} className="card-img-top rounded-top-4" alt={product.title} />
//                   <div className="card-body text-start">
//                     <h5 className="fw-bold">{product.title}</h5>
//                     <p className="text-muted small">{product.desc}</p>
//                     <p className="price-tag">{product.price}</p>
//                   </div>
//                   <button className="buy-now-overlay" onClick={() => { setCart([{ ...product }]); setShowCheckout(true); setCheckoutStep(1); }}>
//                     <i className="fas fa-shopping-cart"></i> Buy Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-5">
//             <Link to="/products">
//               <button className="view-all-btn">View All Products</button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Checkout showCheckout={showCheckout} setShowCheckout={setShowCheckout} checkoutStep={checkoutStep} nextStep={nextStep} prevStep={prevStep} setCart={setCart} />

//       {/* Contact Section */}
//       <section className="contact-section py-5">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6 mb-4 mb-lg-0">
//               <h3 className="fw-bold">Send Us a Message</h3>
//               <p className="text-muted">
//                 Have questions about our saffron? We're here to help you choose the perfect product.
//               </p>
//             </div>
//             <div className="col-lg-6">
//               <div className="contact-box p-4 shadow-sm rounded bg-white">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row g-3">
//                     <div className="col-md-6">
//                       <input type="text" name="name" placeholder="Your Name" className="form-control" value={formData.name} onChange={handleChange} required />
//                     </div>
//                     <div className="col-md-6">
//                       <input type="email" name="email" placeholder="Your Email" className="form-control" value={formData.email} onChange={handleChange} required />
//                     </div>
//                     <div className="col-12">
//                       <textarea rows="4" name="message" placeholder="Your Message" className="form-control" value={formData.message} onChange={handleChange} required></textarea>
//                     </div>
//                     <div className="col-12 text-end">
//                       <button type="submit" className="btn send-btn">
//                         <i className="bi bi-send-fill me-2"></i> Send Message
//                       </button>
//                     </div>
//                   </div>
//                 </form>

//                 {popup.show && (
//                   <div className={`popup-message ${popup.success ? "success" : "error"} show`}>
//                     {popup.text}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;





import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/Home.css";
import heroImg from "../assets/Saffron.png";
import saffron1 from "../assets/1st.jpeg";
import saffron2 from "../assets/2nd.jpeg";
import giftbox from "../assets/giftbox.jpeg";
import mountain from "../assets/mountain.png";
import Checkout from "./Checkout";

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // ✅ For FAQ accordion

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⬆️ At the top of your Home (or wherever you added Featured Collection)
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

  // Step controls
  const nextStep = () => setCheckoutStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCheckoutStep((prev) => Math.max(prev - 1, 1));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How to identify pure saffron?",
      answer:
        "Pure saffron has a distinctive aroma, deep red color, and when soaked in water, it releases a golden yellow color slowly. Our Kishtwar saffron is GI-tagged and comes with authenticity certificates.",
    },
    {
      question: "How to store saffron properly?",
      answer:
        "Store saffron in an airtight container away from direct sunlight and moisture to maintain its aroma and color for a long time.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship our saffron globally with proper packaging and certification to ensure freshness and authenticity upon delivery.",
    },
  ];

  return (
    <div className="page-wrapper">
      {/* ✅ Hero Section */}
      <section
        className="hero text-white"
        style={{ background: `url(${heroImg}) no-repeat center center/cover` }}
      >
        <div className="overlay"></div>
        <div className="container text-center hero-content">
          <span className="tagline-badge mb-3">
            GI TAGGED AUTHENTIC SAFFRON
          </span>
          <h1 className="main-title">KISHTWAR GOLD</h1>
          <h3 className="sub-title">The Pride of Pure Saffron</h3>
          <p className="hero-text">
            From the heart of Kishtwar, bringing purity and richness to your
            life. <br />
            Experience the world’s finest GI-tagged saffron, handpicked by
            master farmers.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <Link to="/products" style={{ textDecoration: "none" }}>
              <button className="cta-btn primary-btn">
                <i className="fas fa-bag-shopping"></i>SHOP NOW
              </button>
            </Link>
            <button className="cta-btn outline-btn">
              <i className="bi bi-crown me-2"></i>EXPLORE EXCLUSIVE COLLECTION
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Heritage Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <button className="highlight-btn mb-3">Our Legacy</button>
            <h2 className="fw-bold" style={{ textAlign: "left" }}>
              Saffron Heritage of Kishtwar
            </h2>
            <p className="text-muted mb-4">
              Nestled in the pristine valleys of Kishtwar, our saffron fields
              have been cultivating the world's most precious spice for
              generations. Each thread tells a story of tradition, purity, and
              unmatched quality.
            </p>
            <div className="row g-3 mb-4">
              <div className="col-6 col-md-6">
                <div className="info-box">
                  <span>🌞</span> GI Tagged
                </div>
              </div>
              <div className="col-6 col-md-6">
                <div className="info-box">
                  <span>⚠️</span> High Altitude
                </div>
              </div>
              <div className="col-6 col-md-6">
                <div className="info-box">
                  <span>✋</span> Hand Picked
                </div>
              </div>
              <div className="col-6 col-md-6">
                <div className="info-box">
                  <span>🏅</span> Premium Grade
                </div>
              </div>
            </div>
            <Link to="/about">
              <button className="learn-btn">Learn More About Us</button>
            </Link>
          </div>

          <div className="col-lg-6">
            <div className="rounded-4 overflow-hidden shadow">
              <img
                src={mountain}
                alt="Mountain valley"
                className="img-fluid w-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Products Section */}
      <section className="products-section py-5">
        <div className="container text-center">
          <button className="badge-btn mb-3">Featured Collection</button>
          <h2 className="fw-bold">Premium Saffron Selection</h2>
          <p className="text-muted mb-5">
            Discover our handpicked collection of premium saffron products,
            perfect for culinary excellence and gifting.
          </p>

          <div className="row g-4">
            {[
              {
                img: saffron1,
                title: "Premium Saffron 1g",
                price: "₹500",
                desc: "Handpicked premium Kishtwar saffron, 1 gram pack",
              },
              {
                img: saffron2,
                title: "Premium Saffron 2g",
                price: "₹950",
                desc: "Handpicked premium Kishtwar saffron, 2 gram pack",
              },
              {
                img: giftbox,
                title: "Premium Gift Box 5g",
                price: "₹2250",
                desc: "Luxury gift box with 5g premium saffron",
              },
            ].map((product, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <img
                    src={product.img}
                    className="card-img-top rounded-top-4"
                    alt={product.title}
                  />
                  <div className="card-body text-start">
                    <h5 className="fw-bold">{product.title}</h5>
                    <p className="text-muted small">{product.desc}</p>
                    <p className="price-tag">{product.price}</p>
                  </div>
                  <button
                    className="buy-now-overlay"
                    onClick={() => {
                      setCart([{ ...product }]); // put product in cart
                      setShowCheckout(true); // open modal
                      setCheckoutStep(1); // reset to first step
                    }}
                  >
                    <i className="fas fa-shopping-cart"></i> Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <Link to="/products">
              <button className="view-all-btn">View All Products</button>
            </Link>
          </div>
        </div>
      </section>
      <Checkout
        showCheckout={showCheckout}
        setShowCheckout={setShowCheckout}
        checkoutStep={checkoutStep}
        nextStep={nextStep}
        prevStep={prevStep}
        setCart={setCart}
      />

      {/* ✅ Reviews Section */}
      <section className="reviews-section py-5">
        <div className="container text-center">
          <button className="badge-btn mb-3">Customer Reviews</button>
          <h2 className="fw-bold mb-5">What Our Customers Say</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="review-card p-4 shadow-sm h-100">
                <p className="stars">★★★★★</p>
                <p className="fst-italic">
                  "Purest saffron I've ever used! The aroma is incredible and
                  the quality is outstanding."
                </p>
                <p className="fw-bold mb-0">
                  Aarti Sharma <span className="city-name"> | Mumbai</span>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="review-card p-4 shadow-sm h-100">
                <p className="stars">★★★★★</p>
                <p className="fst-italic">
                  "Great aroma, fast delivery. Will definitely <br />
                  order again."
                </p>
                <p className="fw-bold mb-0">
                  Rahul Gupta <span className="city-name"> | Delhi</span>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="review-card p-4 shadow-sm h-100">
                <p className="stars">★★★★★</p>
                <p className="fst-italic">
                  "Authentic Kashmiri saffron. Perfect for special occasions."
                </p>
                <p className="fw-bold mb-0">
                  Priya Patel <span className="city-name"> | Pune</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Link to="/review">
              <button className="read-more-btn">Read More Reviews</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ FAQ Section */}
      <section className="faq-section py-5">
        <div className="container text-center">
          <button className="badge-btn mb-3">Frequently Asked</button>
          <h2 className="fw-bold mb-4">Common Questions</h2>

          <div className="accordion">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`accordion-item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`arrow ${activeIndex === index ? "open" : ""}`}
                  ></span>
                </button>

                {activeIndex === index && (
                  <div className="accordion-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link to="/faq">
              <button className="faq-btn">VIEW ALL FAQS</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Contact Section */}
      <section className="contact-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h3 className="fw-bold">Send Us a Message</h3>
              <p className="text-muted">
                Have questions about our saffron? We're here to help you choose
                the perfect product.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="contact-box p-4 shadow-sm rounded bg-white">
                <form
                  method="POST"
                  action="https://getform.io/f/bolzrmna"
                  encType="multipart/form-data"
                >
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="full_name"
                        className="form-control"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        rows="4"
                        name="message"
                        className="form-control"
                        placeholder="Your Message"
                      ></textarea>
                    </div>
                    <div className="col-12 text-end">
                      <button
                        type="submit"
                        className="btn send-btn"
                        style={{ color: "white" }}
                      >
                        <i
                          className="bi bi-send-fill me-2"
                          style={{ color: "white" }}
                        ></i>{" "}
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;