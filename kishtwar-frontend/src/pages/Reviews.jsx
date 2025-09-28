// import React, { useState } from "react";
// import "../components/Review.css";
// import aboutImg from "../assets/Saffron.png";

// const Review = () => {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     review: "",
//   });
//   const [ratingError, setRatingError] = useState("");
//   const [message, setMessage] = useState("");
//   const [showMessage, setShowMessage] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Function to show side popup message
//   const showPopup = (msg, error = false) => {
//     setMessage(msg);
//     setIsError(error);
//     setShowMessage(true);
//     setTimeout(() => setShowMessage(false), 3000); // popup disappear after 3s
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Rating validation
//     if (rating === 0) {
//       setRatingError("Please select a rating!");
//       return;
//     } else {
//       setRatingError("");
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/reviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name,
//           location: formData.location,
//           message: formData.review,
//           rating: rating,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         showPopup(data.msg || "Review Submitted Successfully!", false); // ✅ green popup
//         setFormData({ name: "", location: "", review: "" });
//         setRating(0);
//       } else {
//         showPopup(data.msg || "Something went wrong", true); // ✅ red popup
//       }
//     } catch (error) {
//       console.error(error);
//       showPopup("Server error. Please try again later.", true); // ✅ red popup
//     }
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <section
//         className="about-hero text-white"
//         style={{ background: `url(${aboutImg}) no-repeat center center/cover` }}
//       >
//         <div className="overlay"></div>
//         <div className="container text-center hero-content">
//           <h1 className="main-title">Customer Reviews</h1>
//           <h3 className="sub-title">
//             What our customers say about Kishtwar Gold
//           </h3>
//         </div>
//       </section>

//       {/* Existing Reviews Section */}
//       <section className="reviews-section py-5">
//   <div className="container">
//     <h2 className="text-center mb-4 fw-bold">What Our Customers Say</h2>

//     {/* Unified review box */}
//     <div className="review-box p-4 shadow rounded-4">
//       <div className="row g-4">
//         {/* Review 1 */}
//         <div className="col-lg-4 col-md-6">
//           <div className="review-card">
//             <div className="d-flex align-items-center mb-3">
//               <div className="user-icon">
//                 <i className="fas fa-user fs-4"></i>
//               </div>
//               <div className="ms-3 text-start">
//                 <h5 className="mb-0 fw-bold">Rahul Gupta</h5>
//                 <small className="text-muted">Delhi</small>
//               </div>
//             </div>
//             <div className="stars">★★★★★</div>
//             <p className="text-muted">
//               "Great aroma, fast delivery. Will definitely order again."
//             </p>
//             <p className="verified">
//               <i className="fas fa-check-circle"></i> Verified Purchase
//             </p>
//           </div>
//         </div>

//         {/* Review 2 */}
//         <div className="col-lg-4 col-md-6">
//           <div className="review-card">
//             <div className="d-flex align-items-center mb-3">
//               <div className="user-icon">
//                 <i className="fas fa-user fs-4"></i>
//               </div>
//               <div className="ms-3 text-start">
//                 <h5 className="mb-0 fw-bold">Priya Patel</h5>
//                 <small className="text-muted">Ahmedabad</small>
//               </div>
//             </div>
//             <div className="stars">★★★★★</div>
//             <p className="text-muted">
//               "Authentic Kashmiri saffron. Perfect for special occasions."
//             </p>
//             <p className="verified">
//               <i className="fas fa-check-circle"></i> Verified Purchase
//             </p>
//           </div>
//         </div>

//         {/* Review 3 */}
//         <div className="col-lg-4 col-md-6">
//           <div className="review-card">
//             <div className="d-flex align-items-center mb-3">
//               <div className="user-icon">
//                 <i className="fas fa-user fs-4"></i>
//               </div>
//               <div className="ms-3 text-start">
//                 <h5 className="mb-0 fw-bold">Meera Singh</h5>
//                 <small className="text-muted">Bangalore</small>
//               </div>
//             </div>
//             <div className="stars">★★★★★</div>
//             <p className="text-muted">
//               "The quality is exceptional! I’ve been using saffron for years, and this is by far the best I’ve tried."
//             </p>
//             <p className="verified">
//               <i className="fas fa-check-circle"></i> Verified Purchase
//             </p>
//           </div>
//         </div>

//         {/* Review 4 */}
//         <div className="col-lg-4 col-md-6">
//           <div className="review-card">
//             <div className="d-flex align-items-center mb-3">
//               <div className="user-icon">
//                 <i className="fas fa-user fs-4"></i>
//               </div>
//               <div className="ms-3 text-start">
//                 <h5 className="mb-0 fw-bold">Chef Vikram</h5>
//                 <small className="text-muted">Pune</small>
//               </div>
//             </div>
//             <div className="stars">★★★★★</div>
//             <p className="text-muted">
//               "As a professional chef, I demand the best ingredients. Kishtwar Gold delivers authentic saffron that elevates every dish."
//             </p>
//             <p className="verified">
//               <i className="fas fa-check-circle"></i> Verified Purchase
//             </p>
//           </div>
//         </div>

//         {/* Review 5 */}
//         <div className="col-lg-4 col-md-6">
//           <div className="review-card">
//             <div className="d-flex align-items-center mb-3">
//               <div className="user-icon">
//                 <i className="fas fa-user fs-4"></i>
//               </div>
//               <div className="ms-3 text-start">
//                 <h5 className="mb-0 fw-bold">Anjali Mehta</h5>
//                 <small className="text-muted">Chennai</small>
//               </div>
//             </div>
//             <div className="stars">★★★★☆</div>
//             <p className="text-muted">
//               "Perfect for special occasions. The packaging is elegant and the saffron quality is outstanding. Highly recommended!"
//             </p>
//             <p className="verified">
//               <i className="fas fa-check-circle"></i> Verified Purchase
//             </p>
//           </div>
//         </div>

//         {/* Review 6 */}
//         <div className="col-lg-4 col-md-6">
//           <div className="review-card">
//             <div className="d-flex align-items-center mb-3">
//               <div className="user-icon">
//                 <i className="fas fa-user fs-4"></i>
//               </div>
//               <div className="ms-3 text-start">
//                 <h5 className="mb-0 fw-bold">Neha Sharma</h5>
//                 <small className="text-muted">Mumbai</small>
//               </div>
//             </div>
//             <div className="stars">★★★★★</div>
//             <p className="text-muted">
//               "Amazing fragrance and purity! This saffron is unmatched."
//             </p>
//             <p className="verified">
//               <i className="fas fa-check-circle"></i> Verified Purchase
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>


//       {/* Review Form Section */}
//       <section className="review-form-section my-5">
//         <div className="card p-4 shadow border-0 rounded-4">
//           <h2 className="fw-bold mb-3 text-center">Share Your Experience</h2>
//           <p className="text-muted text-center mb-4">
//             Help other customers by sharing your experience with Kishtwar Gold
//             saffron.
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="row mb-3">
//               <div className="col-md-6 mb-3">
//                 <label className="form-label fw-bold">Your Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-control"
//                   placeholder="Enter your name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="form-label fw-bold">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   className="form-control"
//                   placeholder="Your city"
//                   value={formData.location}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Rating Stars */}
//             <div className="mb-3 text-start">
//               <label className="form-label fw-bold d-block">Rating</label>
//               <div className="rating-stars">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <i
//                     key={star}
//                     className={`fa-solid fa-star ${
//                       star <= (hover || rating) ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       setRating(star);
//                       setRatingError(""); // clear error when user selects rating
//                     }}
//                     onMouseEnter={() => setHover(star)}
//                     onMouseLeave={() => setHover(0)}
//                   ></i>
//                 ))}
//               </div>
//               {/* Inline rating error */}
//               {ratingError && <small className="text-danger">{ratingError}</small>}
//             </div>

//             {/* Review Text */}
//             <div className="mb-3">
//               <label className="form-label fw-bold">Your Review</label>
//               <textarea
//                 name="review"
//                 className="form-control"
//                 rows="5"
//                 placeholder="Share your experience with our saffron..."
//                 value={formData.review}
//                 onChange={handleChange}
//                 required
//               ></textarea>
//             </div>

//             <div className="text-start">
//               <button
//                 type="submit"
//                 className="btn btn-warning fw-bold px-4 py-2"
//               >
//                 Submit Review
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Side Popup Message */}
//         {showMessage && (
//           <div
//             className={`review-message ${isError ? "error" : "success"} show`}
//           >
//             {message}
//           </div>
//         )}
//       </section>
//     </>
//   );
// };

// export default Review;



import React, { useState } from "react";
import "../components/Review.css"; // ✅ make sure this file exists
import aboutImg from "../assets/Saffron.png";

const Review = () => {
  const [rating, setRating] = useState(0); // store rating
  const [hover, setHover] = useState(0); // for hover effect

  return (
    <>
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
          <h1 className="main-title">Customer Reviews</h1>
          <h3 className="sub-title">
            What our customers say about Kishtwar Gold
          </h3>
        </div>
      </section>

      {/* ✅ Static Reviews */}
      <section className="reviews-section py-5">
  <div className="container">
    <h2 className="text-center mb-4 fw-bold">What Our Customers Say</h2>

    {/* Unified review box */}
    <div className="review-box p-4 shadow rounded-4">
      <div className="row g-4">
        {/* Review 1 */}
        <div className="col-lg-4 col-md-6">
          <div className="review-card">
            <div className="d-flex align-items-center mb-3">
              <div className="user-icon">
                <i className="fas fa-user fs-4"></i>
              </div>
              <div className="ms-3 text-start">
                <h5 className="mb-0 fw-bold">Rahul Gupta</h5>
                <small className="text-muted">Delhi</small>
              </div>
            </div>
            <div className="stars">★★★★★</div>
            <p className="text-muted">
              "Great aroma, fast delivery. Will definitely order again."
            </p>
            <p className="verified">
              <i className="fas fa-check-circle"></i> Verified Purchase
            </p>
          </div>
        </div>

        {/* Review 2 */}
        <div className="col-lg-4 col-md-6">
          <div className="review-card">
            <div className="d-flex align-items-center mb-3">
              <div className="user-icon">
                <i className="fas fa-user fs-4"></i>
              </div>
              <div className="ms-3 text-start">
                <h5 className="mb-0 fw-bold">Priya Patel</h5>
                <small className="text-muted">Ahmedabad</small>
              </div>
            </div>
            <div className="stars">★★★★★</div>
            <p className="text-muted">
              "Authentic Kashmiri saffron. Perfect for special occasions."
            </p>
            <p className="verified">
              <i className="fas fa-check-circle"></i> Verified Purchase
            </p>
          </div>
        </div>

        {/* Review 3 */}
        <div className="col-lg-4 col-md-6">
          <div className="review-card">
            <div className="d-flex align-items-center mb-3">
              <div className="user-icon">
                <i className="fas fa-user fs-4"></i>
              </div>
              <div className="ms-3 text-start">
                <h5 className="mb-0 fw-bold">Meera Singh</h5>
                <small className="text-muted">Bangalore</small>
              </div>
            </div>
            <div className="stars">★★★★★</div>
            <p className="text-muted">
              "The quality is exceptional! I’ve been using saffron for years, and this is by far the best I’ve tried."
            </p>
            <p className="verified">
              <i className="fas fa-check-circle"></i> Verified Purchase
            </p>
          </div>
        </div>

        {/* Review 4 */}
        <div className="col-lg-4 col-md-6">
          <div className="review-card">
            <div className="d-flex align-items-center mb-3">
              <div className="user-icon">
                <i className="fas fa-user fs-4"></i>
              </div>
              <div className="ms-3 text-start">
                <h5 className="mb-0 fw-bold">Chef Vikram</h5>
                <small className="text-muted">Pune</small>
              </div>
            </div>
            <div className="stars">★★★★★</div>
            <p className="text-muted">
              "As a professional chef, I demand the best ingredients. Kishtwar Gold delivers authentic saffron that elevates every dish."
            </p>
            <p className="verified">
              <i className="fas fa-check-circle"></i> Verified Purchase
            </p>
          </div>
        </div>

        {/* Review 5 */}
        <div className="col-lg-4 col-md-6">
          <div className="review-card">
            <div className="d-flex align-items-center mb-3">
              <div className="user-icon">
                <i className="fas fa-user fs-4"></i>
              </div>
              <div className="ms-3 text-start">
                <h5 className="mb-0 fw-bold">Anjali Mehta</h5>
                <small className="text-muted">Chennai</small>
              </div>
            </div>
            <div className="stars">★★★★☆</div>
            <p className="text-muted">
              "Perfect for special occasions. The packaging is elegant and the saffron quality is outstanding. Highly recommended!"
            </p>
            <p className="verified">
              <i className="fas fa-check-circle"></i> Verified Purchase
            </p>
          </div>
        </div>

        {/* Review 6 */}
        <div className="col-lg-4 col-md-6">
          <div className="review-card">
            <div className="d-flex align-items-center mb-3">
              <div className="user-icon">
                <i className="fas fa-user fs-4"></i>
              </div>
              <div className="ms-3 text-start">
                <h5 className="mb-0 fw-bold">Neha Sharma</h5>
                <small className="text-muted">Mumbai</small>
              </div>
            </div>
            <div className="stars">★★★★★</div>
            <p className="text-muted">
              "Amazing fragrance and purity! This saffron is unmatched."
            </p>
            <p className="verified">
              <i className="fas fa-check-circle"></i> Verified Purchase
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ✅ Review Form Section */}
      <section className="review-form-section my-5">
        <div className="card p-4 shadow border-0 rounded-4">
          <h2 className="fw-bold mb-3 text-center">Share Your Experience</h2>
          <p className="text-muted text-center mb-4">
            Help other customers by sharing your experience with Kishtwar Gold saffron.
          </p>

          {/* ✅ Updated Form with Getform */}
          <form
            method="POST"
            action="https://getform.io/f/bolzrmna"
            encType="multipart/form-data"
          >
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="Your city"
                  required
                />
              </div>
            </div>

            {/* ⭐ Rating */}
            <div className="mb-3 text-start">
              <label className="form-label fw-bold d-block">Rating</label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fa-solid fa-star ${
                      star <= (hover || rating) ? "active" : ""
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  ></i>
                ))}
              </div>
              <input type="hidden" name="rating" value={rating} required />
            </div>

            {/* Review Text */}
            <div className="mb-3">
              <label className="form-label fw-bold">Your Review</label>
              <textarea
                name="review"
                className="form-control"
                rows="5"
                placeholder="Share your experience with our saffron..."
                required
              ></textarea>
            </div>

            <div className="text-start">
              <button type="submit" className="btn btn-warning fw-bold px-4 py-2">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Review;
