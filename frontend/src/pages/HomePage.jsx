import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(null); // Track which product is being deleted

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3010/api/products");
        const data = await response.json();

        if (response.ok) {
          setProducts(data.data);
        } else {
          setMessage("No products available");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setMessage("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    
    setDeleting(productId); // Start delete animation
    
    setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:3010/api/products/${productId}`, {
          method: "DELETE",
        });
    
        if (response.ok) {
          setProducts(products.filter(product => product._id !== productId));
        } else {
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
      setDeleting(null); // Stop delete animation after completion
    }, 2000);
  };

  return (
    <div className="home-page">
      <div className="welcome-message">
        <h2>Welcome to our Product Store!</h2>
        <p>Available Products</p>
      </div>

      {message && <p>{message}</p>}

      <div className="products-list">
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img
                    src={product.image || "default-image.jpg"}
                    alt={product.name}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>

                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Price: ${product.price}</p>

                  <div className="product-actions">
                    <Link to={`/edit/${product._id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(product._id)} disabled={deleting === product._id}>
                      {deleting === product._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>

                  {deleting === product._id && (
                    <div className="loading-bar"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {products.length === 0 && (
        <Link to="/create" className="add-product-link">
          Add a Product
        </Link>
      )}
    </div>
  );
};

export default HomePage;
