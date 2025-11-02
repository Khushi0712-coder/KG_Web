import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";
import { useCart } from "../context/CartContext";
import { Collapse } from "bootstrap";

const Navbar = () => {
  const { cart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const bsCollapse = document.getElementById("navbarNav");
    if (bsCollapse && window.innerWidth < 992) {
      let collapse = Collapse.getInstance(bsCollapse);
      if (!collapse) {
        collapse = new Collapse(bsCollapse, { toggle: false }); // init without animation
      }

      // ✅ Instant hide (no slide)
      bsCollapse.classList.remove("collapsing", "show"); 
      bsCollapse.style.height = "0px"; 
      bsCollapse.classList.add("collapse");
    }
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" />
          <div className="brand-text d-none d-sm-block">
            <h5 className="mb-0">KISHTWAR BLOOM</h5>
            <p className="tagline">A FARMER&apos;S BRAND</p>
          </div>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars text-dark"></i>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-lg-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-lg-center text-center">
            <li className="nav-item"><Link className="nav-link" to="/">HOME</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">PRODUCTS</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">ABOUT</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/review">REVIEWS</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/faq">FAQ</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">CONTACT</Link></li>

            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <i className="fas fa-shopping-cart fa-lg text-orange"></i>
                {cart.length > 0 && (  // ✅ show only when cart has items
                  <span id="cart-count" className="cart-count">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>

            {/* Shop Now */}
            <li className="nav-item mt-2 mt-lg-0">
              <Link to="/products" className="shop-btn">
                <i className="fas fa-bag-shopping"></i> SHOP NOW
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
