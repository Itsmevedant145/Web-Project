// src/pages/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // Retrieve the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  // Fetch the product to edit using the ID from the URL
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3010/api/products/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data.data); // Set the product details for editing
        } else {
          setMessage("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage("Error fetching product");
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3010/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/"); // Navigate back to the homepage
      } else {
        alert("Error updating product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
