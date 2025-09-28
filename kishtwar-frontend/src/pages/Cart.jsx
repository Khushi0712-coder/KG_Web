import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Checkout from "./Checkout"; // ✅ import Checkout modal
import "../components/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/products"); // frontend routing
  };

  // ✅ Modal state
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

  const nextStep = () => setCheckoutStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCheckoutStep((prev) => Math.max(prev - 1, 1));

  // ✅ Calculate total
  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * (item.qty || 1);
    });
    setTotal(sum);
  }, [cart]);

  return (
    <section className="cart-section py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold mb-4 d-flex align-items-center fs-2">
          <i className="bi bi-bag-check me-2 fs-2"></i> Shopping Cart
          <span className="badge bg-dark ms-3 fs-6">{cart.length} items</span>
        </h2>

        {cart.length === 0 ? (
          <div className="text-center bg-white p-5 rounded-4 shadow-lg">
            <i className="bi bi-cart-x text-warning fs-1 mb-3"></i>
            <h4 className="fw-bold fs-3">Your cart is empty</h4>
            <p className="text-muted fs-6">
              Start adding products to see them here.
            </p>
            <button
              className="btn btn-warning fw-bold fs-6 px-4 py-2 shadow-sm"
              onClick={() => (window.location.href = "/products")}
            >
              <i className="bi bi-bag-fill me-2"></i> Continue Shopping
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {/* Cart Items */}
            <div className="col-lg-8">
              <div className="bg-white rounded-4 shadow-lg p-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item py-3 border-bottom"
                  >
                    {/* Product Image & Info */}
                    <div className="d-flex align-items-center gap-3 flex-grow-1">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="rounded-3 shadow-sm"
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="w-100">
                        {/* ✅ Product Name only in desktop */}
                        <div className="cart-header">
                          <h5 className="fw-semibold mb-1 fs-5">{item.name}</h5>
                        </div>
                        <p className="text-muted mb-0 fs-6">₹{item.price}</p>
                      </div>
                    </div>

                    {/* ✅ Qty + Remove (mobile view) */}
                    <div className="cart-footer d-flex d-md-none w-100 mt-2">
                      <div className="cart-actions d-flex align-items-center gap-2">
                        <button
                          className="btn btn-outline-dark btn-sm px-3 fs-5"
                          onClick={() => decreaseQty(item.id)}
                        >
                          −
                        </button>
                        <span className="fw-bold fs-5">{item.qty}</span>
                        <button
                          className="btn btn-outline-dark btn-sm px-3 fs-5"
                          onClick={() => increaseQty(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-link text-danger fs-5 remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash fs-4"></i>
                      </button>
                    </div>

                    {/* ✅ Qty + Remove (desktop view → side by side) */}
                    <div className="cart-actions d-none d-md-flex align-items-center gap-2 mt-2 mt-md-0">
                      <button
                        className="btn btn-outline-dark btn-sm px-3 fs-5"
                        onClick={() => decreaseQty(item.id)}
                      >
                        −
                      </button>
                      <span className="fw-bold fs-5">{item.qty}</span>
                      <button
                        className="btn btn-outline-dark btn-sm px-3 fs-5"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>

                      {/* ✅ Remove icon desktop me qty ke right me */}
                      <button
                        className="btn btn-link text-danger fs-5 remove-btn ms-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash fs-4"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              {/* <div className="d-flex gap-3 mt-3">
                <button
                  className="btn btn-outline-secondary flex-grow-1 fs-6 py-2 shadow-sm"
                  onClick={goToProducts}
                >
                  Save for Later
                </button>
                <button className="btn btn-outline-secondary flex-grow-1 fs-6 py-2 shadow-sm">
                  Add to Wishlist
                </button>
              </div> */}
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div
                className="bg-white rounded-4 shadow-lg p-4"
                style={{
                  position: "sticky",
                  top: "90px",
                  alignSelf: "flex-start",
                }}
              >
                <h5 className="fw-bold mb-4 fs-4">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2 fs-6">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{total}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-6">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                {/* <div className="d-flex justify-content-between mb-3 fs-6">
                  <span>Tax</span>
                  <span>₹{(total * 0.08).toFixed(2)}</span>
                </div> */}

                <hr />

                <div className="d-flex justify-content-between fw-bold fs-4 mb-3">
                  <span>Total</span>
                  <span>₹{total}</span>
                  {/* <span>₹{(total + total * 0.08).toFixed(2)}</span> */}
                </div>

                {/* Promo Code */}
                {/* <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control fs-6"
                    placeholder="Enter code"
                  />
                  <button className="btn btn-outline-dark fs-6">Apply</button>
                </div> */}

                {/* ✅ Open Checkout Modal */}
                <button
                  className="btn btn-dark w-100 fw-bold mb-2 fs-6 py-2 shadow-sm"
                  onClick={() => {
                    setShowCheckout(true);
                    setCheckoutStep(1);
                  }}
                >
                  Proceed to Checkout
                </button>

                <button
                  className="btn btn-outline-secondary w-100 fs-6 py-2"
                  onClick={() => (window.location.href = "/products")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Checkout Modal */}
      <Checkout
        showCheckout={showCheckout}
        setShowCheckout={setShowCheckout}
        checkoutStep={checkoutStep}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </section>
  );
};

export default Cart;
