import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CreatePage.css';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const { createProduct } = useProductStore();
  const navigate = useNavigate(); // Initialize navigate

  const handleAddProduct = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Optional: Validate image URL
    const isValidImage = newProduct.image.match(/\.(jpeg|jpg|gif|png|webp)$/i);
    if (!isValidImage) {
      setMessage("Please enter a valid image URL.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const { success, message } = await createProduct(newProduct);
      setMessage(message); // Display success or error message

      if (success) {
        setNewProduct({ name: '', price: '', image: '' }); // Clear fields on success
        
        // Redirect to home page after 1 second
        setTimeout(() => navigate('/'), 1000);
      }

      // Hide the message after 3 seconds
      setTimeout(() => setMessage(''), 3000);

    } catch (error) {
      setMessage("Error creating product. Please try again.");
      console.error(error);
      setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="create-page">
      <h1>Create New Product</h1>
      <form onSubmit={handleAddProduct}>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
        />
        
        <label>Product Price:</label>
        <input
          type="text"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
        />

        <label>Product Image URL:</label>
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
        />

        <button type="submit">Create Product</button>
      </form>

      {message && <div className="toast-message">{message}</div>} {/* Display the toast message */}
      
      {loading && <div className="loading-bar"></div>} {/* Loading bar */}

    </div>
  );
};

export default CreatePage;
