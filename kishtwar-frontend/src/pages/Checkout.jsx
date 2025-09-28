import React, { useState } from "react";
import "../components/Checkout.css";

const Checkout = ({
  showCheckout,
  setShowCheckout,
  checkoutStep,
  nextStep,
  prevStep,
  setCart,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState(""); // ✅ validation error message

  if (!showCheckout) return null;

  const getStepTitle = () => {
    switch (checkoutStep) {
      case 1:
        return "Customer Info";
      case 2:
        return "Shipping Address";
      case 3:
        return "Payment";
      default:
        return "Checkout";
    }
  };

  // ✅ Validation Function
  const handleNext = () => {
    if (checkoutStep === 1) {
      const phone = document.querySelector('input[type="tel"]').value.trim();
      const email = document.querySelector('input[type="email"]').value.trim();
      if (!phone || !email) {
        setError("⚠️ Please enter mobile number and email.");
        return;
      }
    }

    if (checkoutStep === 2) {
      const fullName = document
        .querySelector('input[placeholder="Full Name"]')
        .value.trim();
      const area = document
        .querySelector('input[placeholder="Area / Locality"]')
        .value.trim();
      const city = document
        .querySelector('input[placeholder="City"]')
        .value.trim();
      const state = document
        .querySelector('input[placeholder="State"]')
        .value.trim();
      const pincode = document
        .querySelector('input[placeholder="Pincode"]')
        .value.trim();

      if (!fullName || !area || !city || !state || !pincode) {
        setError("⚠️ Please fill all required address fields.");
        return;
      }
    }

    if (checkoutStep === 3 && !paymentMethod) {
      setError("⚠️ Please select a payment method.");
      return;
    }

    setError(""); // clear error
    nextStep();
  };

  return (
    <>
      {/* ✅ Blurred Background */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1040,
        }}
      ></div>

      {/* ✅ Modal */}
      <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content shadow-lg">
            {/* Header */}
            <div className="modal-header justify-content-center bg-dark text-white">
              <h5
                className="modal-title w-100 text-center"
                style={{ fontWeight: "bold", color: "#e68900" }}
              >
                {getStepTitle()}
              </h5>
              <button
                type="button"
                className="btn-close position-absolute end-0 me-3"
                onClick={() => setShowCheckout(false)}
                style={{ filter: "invert(1)" }} // ✅ white cross
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {error && <p className="text-danger fw-bold">{error}</p>}

              {checkoutStep === 1 && (
                <div>
                  <div className="d-flex gap-2 mb-3">
                    <select className="form-select w-auto">
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                    </select>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    required
                  />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="offersCheck"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="offersCheck">
                      Send me offers and order updates
                    </label>
                  </div>
                </div>
              )}

              {checkoutStep === 2 && (
                <div>
                  <input type="text" className="form-control mb-2" placeholder="Full Name" />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="House No. / Building (Optional)"
                  />
                  <input type="text" className="form-control mb-2" placeholder="Area / Locality" />
                  <input type="text" className="form-control mb-2" placeholder="City" />
                  <input type="text" className="form-control mb-2" placeholder="State" />
                  <input type="text" className="form-control mb-2" placeholder="Pincode" />
                  <div className="form-check mt-2">
                    <input className="form-check-input" type="checkbox" id="saveAddress" />
                    <label className="form-check-label" htmlFor="saveAddress">
                      Save my address as default
                    </label>
                  </div>
                </div>
              )}

              {checkoutStep === 3 && (
                <div>
                  <select
                    className="form-select mb-3"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="card">Credit / Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>

                  {paymentMethod === "card" && (
                    <div>
                      <input type="text" className="form-control mb-2" placeholder="Card Number" />
                      <input type="text" className="form-control mb-2" placeholder="Expiry Date (MM/YY)" />
                      <input type="text" className="form-control mb-2" placeholder="CVV" />
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <input type="text" className="form-control mb-2" placeholder="Enter UPI ID" />
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <p className="text-muted">💵 You will pay in cash upon delivery.</p>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="modal-footer">
              {checkoutStep > 1 && (
                <button className="btn btn-secondary" onClick={prevStep}>
                  <b>Previous</b>
                </button>
              )}
              {checkoutStep < 3 && (
                <button className="btn btn-warning" onClick={handleNext}>
                  <b>Next</b>
                </button>
              )}
              {checkoutStep === 3 && (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    if (!paymentMethod) {
                      setError("⚠️ Please select a payment method.");
                      return;
                    }
                    alert("Order placed successfully!");
                    setShowCheckout(false);
                    setCart([]);
                  }}
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
