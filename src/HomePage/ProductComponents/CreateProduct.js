import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import axiosInstance from "./axiosInterceptor";

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image_url: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/product/create", productData);
      setIsLoading(false);
      setMessage(response.data.message);
      setProductData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image_url: "",
      });
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.detail || "Something went wrong.");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}
      >
        <h2>Add Product</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
            rows="4"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={productData.stock}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={productData.category}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
            required
          />
          <input
            type="url"
            name="image_url"
            placeholder="Image URL"
            value={productData.image_url}
            onChange={handleInputChange}
            style={{ margin: "10px 0", padding: "10px", fontSize: "16px" }}
          />
          {!isLoading && (
            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "white",
              }}
            >
              Add Product
            </button>
          )}
          {isLoading && (
            <button
              disabled
              style={{
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "white",
              }}
            >
              Adding...
            </button>
          )}
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default CreateProduct;
