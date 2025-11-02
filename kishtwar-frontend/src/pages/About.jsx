import React from "react";
import "../components/About.css"; // ✅ make sure you create About.css for styling
import aboutImg from "../assets/Saffron.png"; // ✅ adjust path if needed
import Legacy from "../assets/about.avif";

const About = () => {
  return (
    <div className="about-page">
      {/* ✅ About Hero Section */}
      <section
        className="about-hero text-white"
        style={{
          background: `url(${aboutImg}) no-repeat center center/cover`,
        }}
      >
        {/* Overlay */}
        <div className="overlay"></div>

        {/* Content */}
        <div className="container text-center hero-content">
          {/* Main Title */}
          <h1 className="main-title">About Kishtwar Bloom</h1>

          {/* Subtitle */}
          <h3 className="sub-title">A Legacy of Premium Saffron Excellence</h3>
        </div>
      </section>

      {/* ✅ Generations of Excellence Section */}
      <section className="generations-section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              {/* <span className="badge bg-warning text-light px-3 py-3 rounded-pill fw-bold">
                OUR LEGACY
              </span> */}
              <h2 className="mt-3 fw-bold">Generations of Excellence</h2>
              <p>
                For over three generations, our family has been cultivating the
                finest saffron in the pristine valleys of Kishtwar. What started
                as a small family farm has grown into a legacy of quality,
                authenticity, and trust.
              </p>
              <p>
                Our journey began in the early 1900s when our great-grandfather
                first planted saffron bulbs in the fertile soil of Kishtwar. The
                unique climate and soil conditions of this region, combined with
                traditional farming techniques passed down through generations,
                create the perfect environment for producing the world's finest
                saffron.
              </p>

              {/* Stats Cards */}
              <div className="row text-center mt-4">
                <div className="col-6">
                  <div className="stat-card">
                    <h2>100+</h2>
                    <h5>
                      <b>Years of Tradition</b>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
              <img
                src={Legacy}
                alt="Generations of Excellence"
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Our Mission Section */}
      <section className="mission-section py-5 text-center">
        <div className="container">
          <button className="badge-btn mb-3">Our Mission</button>
          <h2 className="mt-3 fw-bold">Bringing Purity to Your Kitchen</h2>
          <p className="mt-3 mb-5">
            Our mission is to share the authentic taste and aroma of Kishtwar
            saffron with the world. We are committed to sustainable farming
            practices, supporting local farmers, and delivering the highest
            quality saffron directly from our fields to your table.
          </p>

          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="mission-card">
                <div className="icon-circle">
                  <i className="fa-solid fa-leaf"></i>
                </div>
                <h5 className="mt-3">Sustainable Farming</h5>
                <p>
                  We practice organic farming methods that preserve the
                  environment and maintain soil health for future generations.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="mission-card">
                <div className="icon-circle">
                  <i className="fa-solid fa-handshake"></i>
                </div>
                <h5 className="mt-3">Fair Trade</h5>
                <p>
                  We ensure fair compensation for all farmers and workers
                  involved in the cultivation and processing of our saffron.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="mission-card">
                <div className="icon-circle">
                  <i className="fa-solid fa-heart"></i>
                </div>
                <h5 className="mt-3">Quality Commitment</h5>
                <p>
                  Every thread of saffron is carefully inspected and tested to
                  meet our stringent <br />
                  quality standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Our Process Section */}
      <section className="process-section text-center py-5">
        <div className="container">
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
            OUR PROCESS
          </span>
          <h2 className="mt-3 fw-bold">From Field to Table</h2>
          <p>
            Discover the meticulous process that brings you the finest saffron
          </p>

          <div className="row g-4 justify-content-center">
            {/* Step 1 */}
            <div className="col-md-3">
              <div className="process-card">
                <div className="step-badge">01</div>
                <div className="icon-circle">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <br />
                <h5>Cultivation</h5>
                <p>
                  Planted in nutrient-rich soil at high altitudes with perfect
                  climate conditions.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-md-3">
              <div className="process-card">
                <div className="step-badge">02</div>
                <div className="icon-circle">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <br />
                <h5>Hand Picking</h5>
                <p>
                  Flowers are carefully hand-picked at dawn to preserve their
                  delicate stigmas.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-3">
              <div className="process-card">
                <div className="step-badge">03</div>
                <div className="icon-circle">
                  <i className="fa-solid fa-fire-flame-simple"></i>
                </div>
                <br />
                <h5>Drying</h5>
                <p>
                  Traditional drying methods preserve the natural color, aroma,
                  and <br /> flavor.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="col-md-3">
              <div className="process-card">
                <div className="step-badge">04</div>
                <div className="icon-circle">
                  <i className="fa-solid fa-box"></i>
                </div>
                <br />
                <h5>Packaging</h5>
                <p>
                  Carefully packaged in airtight containers to maintain
                  freshness and quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
