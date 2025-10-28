import React, { useState } from "react";
import "../components/Products.css";
import heroImg from "../assets/Saffron.png";
import saffron1 from "../assets/1st.jpeg";
import saffron2 from "../assets/2nd.jpeg";
import giftbox from "../assets/giftbox.jpeg";
import Checkout from "./Checkout";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Product = () => {
  // ✅ Product Data
  const productList = [
    {
      id: 1,
      name: "Exclusive Collection 10G",
      price: 8999,
      category: "exclusive",
      desc: "Ultra-premium exclusive Kishtwar saffron collection",
      img: saffron1,
    },
    {
      id: 2,
      name: "Exclusive Collection 5G",
      price: 4999,
      category: "exclusive",
      desc: "Hand-picked premium saffron in 5G box",
      img: saffron2,
    },
    {
      id: 3,
      name: "Premium Box 2G",
      price: 950,
      category: "premium",
      desc: "Finest premium saffron with authentic aroma",
      img: saffron1,
    },
    {
      id: 4,
      name: "Gift Box 3G",
      price: 4000,
      category: "gift",
      desc: "Special saffron gift box for your loved ones",
      img: giftbox,
    },
    {
      id: 5,
      name: "Premium Gift Box",
      price: 3500,
      category: "premium",
      desc: "Pure saffron strands in a premium pack",
      img: saffron2,
    },
    {
      id: 6,
      name: "Premium Gift Box",
      price: 3500,
      category: "gift",
      desc: "Elegant saffron box for gifting",
      img: giftbox,
    },
  ];

  // ✅ Cart context
  const { cart, addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  // ✅ Local UI states
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState(null); // <-- new state

  // ✅ Calculate cart total
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // ✅ Filter & Sort
  const filteredProducts = productList
    .filter((p) => category === "all" || p.category === category)
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  // ✅ Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product);
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem(
      "cart",
      JSON.stringify([...existingCart, { ...product, qty: 1 }])
    );
  };

  // ✅ Buy Now
  const buyNow = (product) => {
    setBuyNowProduct(product); // <-- store single product
    setShowCheckout(true);
    setCheckoutStep(1);

    // optional: add to cart if not present
    const inCart = cart.some((item) => item.id === product.id);
    if (!inCart) handleAddToCart(product);
  };

  const nextStep = () => setCheckoutStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCheckoutStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="about-page">
      {/* ✅ Hero Section */}
      <section
        className="hero text-white"
        style={{ background: `url(${heroImg}) no-repeat center center/cover` }}
      >
        <div className="overlay"></div>
        <div className="container text-center hero-content">
          <h1 className="main-title">Welcome to Our Saffron Store</h1>
          <p className="hero-text">
            Experience the authentic taste and aroma of pure Kishtwar saffron,
            handpicked and delivered to your doorstep.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <button
              className="cta-btn primary-btn"
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <i className="fas fa-bag-shopping"></i> SHOP NOW
            </button>
          </div>
        </div>
      </section>
      <section id="products" className="products-section py-5">
        <div className="container">
          {/* Filters */}
          <div className="container mb-4">
            <div className="row justify-content-center text-center g-3">
              {/* Category Filter */}
              <div className="col-12 col-md-auto">
                <div className="filter-group d-flex align-items-center justify-content-center">
                  <label htmlFor="categoryFilter" className="fw-semibold me-2">
                    Category:
                  </label>
                  <select
                    id="categoryFilter"
                    className="form-select d-inline-block w-auto"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="all">All Products</option>
                    <option value="exclusive">Exclusive</option>
                    <option value="gift">Gift Box</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              {/* Sort Filter */}
              <div className="col-12 col-md-auto">
                <div className="filter-group d-flex align-items-center justify-content-center">
                  <label htmlFor="sortFilter" className="fw-semibold me-2">
                    Sort by:
                  </label>
                  <select
                    id="sortFilter"
                    className="form-select d-inline-block w-auto"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="row g-4">
            {filteredProducts.map((product) => {
              const inCart = cart.some((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="col-md-4 product-card"
                  data-category={product.category}
                >
                  <div className="card shadow-sm border-3 rounded-4 h-100">
                    <div className="position-relative text-center p-4 bg-light rounded-top">
                      <span
                        className={`product-badge badge-${product.category}`}
                      >
                        {product.category.toUpperCase()}
                      </span>
                      <img
                        src={product.img}
                        className="card-img-top"
                        alt={product.name}
                      />
                    </div>
                    <div className="card-body text-center d-flex flex-column">
                      <h5 className="fw-bold">{product.name}</h5>
                      <p className="text-muted">{product.desc}</p>
                      <h3 className="text-warning fw-bold mb-3">
                        ₹{product.price}
                      </h3>
                      <div className="d-flex justify-content-center gap-3 mt-auto">
                        {inCart ? (
                          <button
                            className="btn btn-success fw-bold"
                            onClick={() => navigate("/cart")}
                          >
                            <i className="fa-solid fa-cart-shopping me-2"></i>
                            Go to Cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning fw-bold"
                            onClick={() => handleAddToCart(product)}
                          >
                            <i className="fa-solid fa-cart-shopping me-2"></i>
                            Add to Cart
                          </button>
                        )}

                        <button
                          className="btn btn-dark fw-bold"
                          onClick={() => buyNow(product)}
                        >
                          <i className="fa-solid fa-bag-shopping me-2"></i> Buy
                          Now
                        </button>
                      </div>
                      <button
                        className="btn btn-link mt-3 text-decoration-none"
                        onClick={() => setSelectedProduct(product)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ Product Details Modal */}
        {selectedProduct && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                {/* Header with White Cross */}
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">{selectedProduct.name}</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setSelectedProduct(null)}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    className="img-fluid mb-3"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "contain",
                    }}
                  />
                  <p>{selectedProduct.desc}</p>
                  <h4 className="text-warning">₹{selectedProduct.price}</h4>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      buyNow(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Checkout Modal */}
        {showCheckout && (
          <Checkout
            showCheckout={showCheckout}
            setShowCheckout={setShowCheckout}
            checkoutStep={checkoutStep}
            nextStep={nextStep}
            prevStep={prevStep}
            setCart={clearCart}
            amount={buyNowProduct ? buyNowProduct.price : totalAmount}
          />
        )}
      </section>

      {/* Why Our Saffron Is Special Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">WHY OUR SAFFRON IS SPECIAL</h2>
          <p className="text-muted mb-5">
            Understanding what makes Kishtwar saffron the world's finest
          </p>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
                <div className="mb-3">
                  <span
                    className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className="fas fa-seedling fa-2x text-black"></i>
                  </span>
                </div>
                <h5 className="fw-bold">ORGANIC CULTIVATION</h5>
                <p className="text-muted">
                  Grown without any chemical fertilizers or pesticides, ensuring
                  pure and natural saffron.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
                <div className="mb-3">
                  <span
                    className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className="fas fa-thermometer-half fa-2x text-black"></i>
                  </span>
                </div>
                <h5 className="fw-bold">PERFECT CLIMATE</h5>
                <p className="text-muted">
                  Kishtwar's unique climate with cold winters and mild summers
                  creates ideal conditions for saffron.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
                <div className="mb-3">
                  <span
                    className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className="fas fa-award fa-2x text-black"></i>
                  </span>
                </div>
                <h5 className="fw-bold">PREMIUM QUALITY</h5>
                <p className="text-muted">
                  Handpicked saffron with unmatched purity and rich flavor for your culinary delights.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
                <div className="mb-3">
                  <span
                    className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className="fas fa-truck fa-2x text-black"></i>
                  </span>
                </div>
                <h5 className="fw-bold">FRESH DELIVERY</h5>
                <p className="text-muted">
                  Direct from farm to your door, ensuring maximum freshness and
                  potency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;




// import React, { useState } from "react";
// import "../components/Products.css";
// import heroImg from "../assets/Saffron.png";
// import saffron1 from "../assets/1st.jpeg";
// import saffron2 from "../assets/2nd.jpeg";
// import giftbox from "../assets/giftbox.jpeg";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// const Product = () => {
//   // ✅ Product Data
//   const productList = [
//     { id: 1, name: "Exclusive Collection 10G", price: 8999, category: "exclusive", desc: "Ultra-premium exclusive Kishtwar saffron collection", img: saffron1 },
//     { id: 2, name: "Exclusive Collection 5G", price: 4999, category: "exclusive", desc: "Hand-picked premium saffron in 5G box", img: saffron2 },
//     { id: 3, name: "Premium Box 2G", price: 950, category: "premium", desc: "Finest premium saffron with authentic aroma", img: saffron1 },
//     { id: 4, name: "Gift Box 3G", price: 4000, category: "gift", desc: "Special saffron gift box for your loved ones", img: giftbox },
//     { id: 5, name: "Premium Gift Box", price: 3500, category: "premium", desc: "Pure saffron strands in a premium pack", img: saffron2 },
//     { id: 6, name: "Premium Gift Box", price: 3500, category: "gift", desc: "Elegant saffron box for gifting", img: giftbox },
//   ];

//   // ✅ Cart context
//   const { cart, addToCart } = useCart();
//   const navigate = useNavigate();

//   // ✅ Local UI states
//   const [category, setCategory] = useState("all");
//   const [sort, setSort] = useState("name");
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // ✅ Filter & Sort
//   const filteredProducts = productList
//     .filter((p) => category === "all" || p.category === category)
//     .sort((a, b) => {
//       if (sort === "name") return a.name.localeCompare(b.name);
//       if (sort === "low-high") return a.price - b.price;
//       if (sort === "high-low") return b.price - a.price;
//       return 0;
//     });

//   // ✅ Add to Cart
//   const handleAddToCart = (product) => {
//     addToCart(product);
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//     localStorage.setItem(
//       "cart",
//       JSON.stringify([...existingCart, { ...product, qty: 1 }])
//     );
//   };

//   // ✅ Buy Now → Full page checkout
//   const buyNow = (product) => {
//     navigate("/checkout", { state: { product } });
//   };

//   return (
//     <div className="about-page">
//       {/* ✅ Hero Section */}
//       <section
//         className="hero text-white"
//         style={{ background: `url(${heroImg}) no-repeat center center/cover` }}
//       >
//         <div className="overlay"></div>
//         <div className="container text-center hero-content">
//           <h1 className="main-title">Welcome to Our Saffron Store</h1>
//           <p className="hero-text">
//             Experience the authentic taste and aroma of pure Kishtwar saffron,
//             handpicked and delivered to your doorstep.
//           </p>
//           <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
//             <button
//               className="cta-btn primary-btn"
//               onClick={() =>
//                 document
//                   .getElementById("products")
//                   .scrollIntoView({ behavior: "smooth" })
//               }
//             >
//               <i className="fas fa-bag-shopping"></i> SHOP NOW
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ✅ Products Section */}
//       <section id="products" className="products-section py-5">
//         <div className="container">
//           {/* Filters */}
//           <div className="container mb-4">
//             <div className="row justify-content-center text-center g-3">
//               {/* Category Filter */}
//               <div className="col-12 col-md-auto">
//                 <div className="filter-group d-flex align-items-center justify-content-center">
//                   <label htmlFor="categoryFilter" className="fw-semibold me-2">
//                     Category:
//                   </label>
//                   <select
//                     id="categoryFilter"
//                     className="form-select d-inline-block w-auto"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                   >
//                     <option value="all">All Products</option>
//                     <option value="exclusive">Exclusive</option>
//                     <option value="gift">Gift Box</option>
//                     <option value="premium">Premium</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Sort Filter */}
//               <div className="col-12 col-md-auto">
//                 <div className="filter-group d-flex align-items-center justify-content-center">
//                   <label htmlFor="sortFilter" className="fw-semibold me-2">
//                     Sort by:
//                   </label>
//                   <select
//                     id="sortFilter"
//                     className="form-select d-inline-block w-auto"
//                     value={sort}
//                     onChange={(e) => setSort(e.target.value)}
//                   >
//                     <option value="name">Name</option>
//                     <option value="low-high">Price: Low to High</option>
//                     <option value="high-low">Price: High to Low</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Grid */}
//           <div className="row g-4">
//             {filteredProducts.map((product) => {
//               const inCart = cart.some((item) => item.id === product.id);

//               return (
//                 <div
//                   key={product.id}
//                   className="col-md-4 product-card"
//                   data-category={product.category}
//                 >
//                   <div className="card shadow-sm border-3 rounded-4 h-100">
//                     <div className="position-relative text-center p-4 bg-light rounded-top">
//                       <span
//                         className={`product-badge badge-${product.category}`}
//                       >
//                         {product.category.toUpperCase()}
//                       </span>
//                       <img
//                         src={product.img}
//                         className="card-img-top"
//                         alt={product.name}
//                       />
//                     </div>
//                     <div className="card-body text-center d-flex flex-column">
//                       <h5 className="fw-bold">{product.name}</h5>
//                       <p className="text-muted">{product.desc}</p>
//                       <h3 className="text-warning fw-bold mb-3">
//                         ₹{product.price}
//                       </h3>
//                       <div className="d-flex justify-content-center gap-3 mt-auto">
//                         {inCart ? (
//                           <button
//                             className="btn btn-success fw-bold"
//                             onClick={() => navigate("/cart")}
//                           >
//                             <i className="fa-solid fa-cart-shopping me-2"></i>
//                             Go to Cart
//                           </button>
//                         ) : (
//                           <button
//                             className="btn btn-warning fw-bold"
//                             onClick={() => handleAddToCart(product)}
//                           >
//                             <i className="fa-solid fa-cart-shopping me-2"></i>
//                             Add to Cart
//                           </button>
//                         )}

//                         <button
//                           className="btn btn-dark fw-bold"
//                           onClick={() => buyNow(product)}
//                         >
//                           <i className="fa-solid fa-bag-shopping me-2"></i> Buy
//                           Now
//                         </button>
//                       </div>
//                       <button
//                         className="btn btn-link mt-3 text-decoration-none"
//                         onClick={() => setSelectedProduct(product)}
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ✅ Product Details Modal */}
//         {selectedProduct && (
//           <div className="modal fade show d-block" tabIndex="-1">
//             <div className="modal-dialog modal-lg modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header bg-dark text-white">
//                   <h5 className="modal-title">{selectedProduct.name}</h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setSelectedProduct(null)}
//                   ></button>
//                 </div>
//                 <div className="modal-body text-center">
//                   <img
//                     src={selectedProduct.img}
//                     alt={selectedProduct.name}
//                     className="img-fluid mb-3"
//                     style={{
//                       maxWidth: "100%",
//                       height: "auto",
//                       maxHeight: "400px",
//                       objectFit: "contain",
//                     }}
//                   />
//                   <p>{selectedProduct.desc}</p>
//                   <h4 className="text-warning">₹{selectedProduct.price}</h4>
//                 </div>

//                 <div className="modal-footer">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setSelectedProduct(null)}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="btn btn-warning"
//                     onClick={() => {
//                       handleAddToCart(selectedProduct);
//                       setSelectedProduct(null);
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                   <button
//                     className="btn btn-dark"
//                     onClick={() => {
//                       buyNow(selectedProduct);
//                       setSelectedProduct(null);
//                     }}
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* ✅ Why Our Saffron Is Special Section */}
//       <section className="py-5 bg-light">
//         <div className="container text-center">
//           <h2 className="fw-bold mb-3">WHY OUR SAFFRON IS SPECIAL</h2>
//           <p className="text-muted mb-5">
//             Understanding what makes Kishtwar saffron the world's finest
//           </p>

//           <div className="row g-4">
//             <div className="col-md-6 col-lg-3">
//               <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
//                 <div className="mb-3">
//                   <span
//                     className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle"
//                     style={{ width: "70px", height: "70px" }}
//                   >
//                     <i className="fas fa-seedling fa-2x text-black"></i>
//                   </span>
//                 </div>
//                 <h5 className="fw-bold">ORGANIC CULTIVATION</h5>
//                 <p className="text-muted">
//                   Grown without any chemical fertilizers or pesticides, ensuring
//                   pure and natural saffron.
//                 </p>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-3">
//               <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
//                 <div className="mb-3">
//                   <span
//                     className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle"
//                     style={{ width: "70px", height: "70px" }}
//                   >
//                     <i className="fas fa-thermometer-half fa-2x text-black"></i>
//                   </span>
//                 </div>
//                 <h5 className="fw-bold">PERFECT CLIMATE</h5>
//                 <p className="text-muted">
//                   Kishtwar's unique climate with cold winters and mild summers
//                   creates ideal conditions for saffron.
//                 </p>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-3">
//               <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
//                 <div className="mb-3">
//                   <span
//                     className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle"
//                     style={{ width: "70px", height: "70px" }}
//                   >
//                     <i className="fas fa-award fa-2x text-black"></i>
//                   </span>
//                 </div>
//                 <h5 className="fw-bold">PREMIUM QUALITY</h5>
//                 <p className="text-muted">
//                   Handpicked saffron with unmatched purity and rich flavor for your culinary delights.
//                 </p>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-3">
//               <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
//                 <div className="mb-3">
//                   <span
//                     className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle"
//                     style={{ width: "70px", height: "70px" }}
//                   >
//                     <i className="fas fa-truck fa-2x text-black"></i>
//                   </span>
//                 </div>
//                 <h5 className="fw-bold">FRESH DELIVERY</h5>
//                 <p className="text-muted">
//                   Direct from farm to your door, ensuring maximum freshness and
//                   potency.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Product;
