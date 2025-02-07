import React from "react";
import "./Navbar.css";
import { FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ Use useLocation

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get the current route

  const handlePlusClick = () => {
    if (location.pathname === "/create") {
      navigate("/"); // ✅ Go back home if already on "/create"
    } else {
      navigate("/create"); // ✅ Go to "/create" if on another page
    }
  };

  return (
    <nav className="navbar">
      {/* Product Store with a link to Home */}
      <div className="left-section">
        <FaShoppingCart className="cart-icon" />
        <Link to="/" className="store-link">
          <h1 id="h11">Product Store</h1>
        </Link>
      </div>

      {/* Add Item Button */}
      <button className="add-item" onClick={handlePlusClick}>
        <FaPlus /> {/* The plus icon */}
      </button>
    </nav>
  );
};

export default Navbar;
