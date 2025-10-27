import React, { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import "../components/Checkout.css";

const Checkout = ({
  showCheckout,
  setShowCheckout,
  checkoutStep,
  nextStep,
  prevStep,
  setCart,
}) => {
  const [error, setError] = useState("");
  const [customerInfo, setCustomerInfo] = useState({ phone: "", email: "" });
  const [address, setAddress] = useState({
    fullName: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (!showCheckout) return null;

  const getStepTitle = () => {
    switch (checkoutStep) {
      case 1:
        return "Customer Info";
      case 2:
        return "Shipping Address";
      case 3:
        return "Make Payment";
      default:
        return "Checkout";
    }
  };

  // ✅ Validation
  const handleNext = () => {
    if (checkoutStep === 1) {
      if (!customerInfo.phone || !customerInfo.email) {
        setError("⚠️ Please enter mobile number and email.");
        return;
      }
    }

    if (checkoutStep === 2) {
      const { fullName, area, city, state, pincode } = address;
      if (!fullName || !area || !city || !state || !pincode) {
        setError("⚠️ Please fill all required address fields.");
        return;
      }
    }
    setError("");
    nextStep();
  };

  // ✅ Cashfree Payment Handler
  const handlePay = async () => {
    const orderAmount = 499;

    const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: orderAmount,
        customer: {
          customer_id: "CU_" + Date.now(),
          customer_name: address.fullName || "Customer",
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
        },
      }),
    });

    const result = await resp.json();

    if (!result.success) {
      alert("Payment creation failed");
      return;
    }

    // const cashfree = await load({ mode: "sandbox" });
const cashfree = await load({ mode: import.meta.env.VITE_CASHFREE_MODE });

    cashfree.checkout({
      paymentSessionId: result.paymentSessionId,
      redirectTarget: "_self",
    })
    .then((res) => {
      if (res?.error) alert(res.error.message);
    });
  };

  return (
    <>
      {/* Background Blur */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1040,
        }}
      ></div>

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content shadow-lg">
            {/* Header */}
            <div className="modal-header justify-content-center bg-dark text-white">
              <h5 className="modal-title w-100 text-center" style={{ fontWeight: "bold", color: "#e68900" }}>
                {getStepTitle()}
              </h5>
              <button
                type="button"
                className="btn-close position-absolute end-0 me-3"
                onClick={() => setShowCheckout(false)}
                style={{ filter: "invert(1)" }}
              />
            </div>

            {/* Body */}
            <div className="modal-body">
              {error && <p className="text-danger fw-bold">{error}</p>}

              {/* Step 1 */}
              {checkoutStep === 1 && (
                <>
                  <div className="d-flex gap-2 mb-3">
                    <select className="form-select w-auto">
                      <option value="+91">+91</option>
                    </select>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    />
                  </div>
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  />
                </>
              )}

              {/* Step 2 */}
              {checkoutStep === 2 && (
                <>
                  <input className="form-control mb-2" placeholder="Full Name"
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Area / Locality"
                    onChange={(e) => setAddress({ ...address, area: e.target.value })} />
                  <input className="form-control mb-2" placeholder="City"
                    onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                  <input className="form-control mb-2" placeholder="State"
                    onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                  <input className="form-control mb-2" placeholder="Pincode"
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                </>
              )}

              {/* Step 3 */}
              {checkoutStep === 3 && (
                <div className="text-center">
                  <h4>Total Payable: <b>₹499</b></h4>
                  <p>Click below to complete secure payment.</p>
                  <button className="btn btn-success btn-lg px-4" onClick={handlePay}>
                    Pay Now
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="modal-footer">
              {checkoutStep > 1 && (
                <button className="btn btn-secondary" onClick={prevStep}>Previous</button>
              )}
              {checkoutStep < 3 && (
                <button className="btn btn-warning" onClick={handleNext}>Next</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
